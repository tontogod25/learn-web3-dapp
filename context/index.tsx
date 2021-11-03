import {createContext, Dispatch, useContext} from 'react';
import {CHAINS_CONFIG} from 'lib/constants';
import {
  GlobalStateT,
  ProtocolStepsT,
  ProtocolsStateT,
  CHAINS,
  StepType,
  PROTOCOL_STEPS_ID,
  PROTOCOL_INNER_STATES_ID,
  NETWORKS,
  PROTOCOLS,
  InnerStateT,
} from 'types';
import {defaultsDeep, difference, keys, omit} from 'lodash';

type StepsReducerHelperT = {
  index: number;
  data: ProtocolStepsT;
};

const stepsReducerHelper = (
  {index, data}: {index: number; data: ProtocolStepsT},
  step: StepType,
): StepsReducerHelperT => {
  const id = step.id;
  const title = step.title;
  const isOneColumn = !!step.isOneColumn;
  const isSkippable = !!step.skippable || isOneColumn;
  const isCompleted = isSkippable ? true : false;
  const isVisited = isSkippable ? true : false;
  const position = index + 1;
  const previousStepId =
    index === 0 ? null : (Object.keys(data)[index - 1] as PROTOCOL_STEPS_ID);
  data[id] = {
    id,
    title,
    isVisited,
    isCompleted,
    isSkippable,
    position,
    previousStepId,
    isOneColumn,
    nextStepId: null,
  };

  if (previousStepId) {
    data[previousStepId].nextStepId = id;
  }

  return {index: index + 1, data};
};

const protocolsReducerHelper = (
  protocolsData: ProtocolsStateT,
  chainId: CHAINS,
): ProtocolsStateT => {
  const steps = CHAINS_CONFIG[chainId].steps.reduce(
    (data, step) => stepsReducerHelper(data, step),
    {index: 0, data: {}} as StepsReducerHelperT,
  );
  const stepsIds = Object.keys(steps.data) as PROTOCOL_STEPS_ID[];
  const numberOfStep = stepsIds.length;
  const firstStepId = PROTOCOL_STEPS_ID.PREFACE;
  const lastStepId = stepsIds[numberOfStep - 1];

  protocolsData[chainId] = {
    id: CHAINS_CONFIG[chainId].id,
    label: CHAINS_CONFIG[chainId].label,
    logoUrl: CHAINS_CONFIG[chainId].logoUrl,
    network: CHAINS_CONFIG[chainId].network,
    isActive: CHAINS_CONFIG[chainId].active,
    protocol: CHAINS_CONFIG[chainId].protocol,
    currentStepId: firstStepId,
    steps: steps.data,
    firstStepId,
    lastStepId,
    numberOfStep,
    innerState: undefined,
  };

  return protocolsData;
};

const buildInitialState = (): ProtocolsStateT => {
  return Object.keys(CHAINS_CONFIG).reduce(
    (protocolsData, chainId) =>
      protocolsReducerHelper(protocolsData, chainId as CHAINS),
    {} as ProtocolsStateT,
  );
};

const clearStepProgression = (steps: ProtocolStepsT): ProtocolStepsT => {
  return Object.keys(steps).reduce((steps, stepId) => {
    steps[stepId as PROTOCOL_STEPS_ID].isCompleted = false;
    steps[stepId as PROTOCOL_STEPS_ID].isVisited = false;
    return steps;
  }, steps);
};

const initialGlobalState = {
  currentChainId: undefined,
  protocols: buildInitialState(),
};

const mergeState = (
  chainId: CHAINS,
  storedState: GlobalStateT,
  initialState: GlobalStateT,
): GlobalStateT => {
  const storageProtocols = storedState ? {...storedState.protocols} : {};
  const initProtocols = {...initialState.protocols};
  const removedKeys = difference(keys(storageProtocols), keys(initProtocols));

  return storedState
    ? ({
        currentChainId: chainId,
        protocols: omit<any>(
          defaultsDeep(storageProtocols, initProtocols),
          removedKeys,
        ),
      } as GlobalStateT)
    : initialState;
};

export type Action =
  | {type: 'SetCurrentChainId'; currentChainId: CHAINS}
  | {type: 'SetChainNetwork'; chainId: CHAINS; network: NETWORKS}
  | {type: 'SetChainProtocol'; chainId: CHAINS; protocol: PROTOCOLS}
  | {
      type: 'SetChainCurrentStepId';
      chainId: CHAINS;
      currentStepId: PROTOCOL_STEPS_ID;
    }
  | {
      type: 'SetStepIsCompleted';
      chainId: CHAINS;
      stepId: PROTOCOL_STEPS_ID;
      value: boolean;
    }
  | {
      type: 'SetIsCompleted';
    }
  | {
      type: 'ClearStepProgression';
      chainId: CHAINS;
    }
  | {
      type: 'Clear';
    }
  | {
      type: 'SetNetwork';
      network: NETWORKS;
    }
  | {
      type: 'SetInnerState';
      values: InnerStateT[];
      isCompleted?: boolean;
    }
  | {
      type: 'SetSharedState';
      values: any[];
      isCompleted?: boolean;
    }
  | {
      type: 'SetStepInnerState';
      chainId: CHAINS;
      innerStateId: PROTOCOL_INNER_STATES_ID;
      value: string | null;
    };

const getKey = (field: InnerStateT) => Object.keys(field)[0];

const getValue = (field: InnerStateT) => Object.values(field)[0];

function globalStateReducer(state: GlobalStateT, action: Action): GlobalStateT {
  switch (action.type) {
    case 'SetCurrentChainId':
      return {...state, currentChainId: action.currentChainId};

    case 'SetInnerState': {
      const chainId = getCurrentChainId(state);
      const stepId = getCurrentStepIdForCurrentChain(state);
      const innerState = getChainInnerStates(state);
      let newInnerState = {...innerState} as InnerStateT;
      action.values.forEach((field: InnerStateT) => {
        const key = getKey(field);
        const value = getValue(field);
        newInnerState = {
          ...newInnerState,
          [key]: value,
        };
      });

      return {
        ...state,
        protocols: {
          ...state.protocols,
          [chainId]: {
            ...state.protocols[chainId],
            steps: {
              ...state.protocols[chainId].steps,
              [stepId]: {
                ...state.protocols[chainId].steps[stepId],
                isCompleted: !!action.isCompleted,
              },
            },
            innerState: {...newInnerState},
          },
        },
      };
    }

    case 'Clear': {
      const newSteps = clearStepProgression(getStepsForCurrentChain(state));
      const chainId = getCurrentChainId(state);
      const firstStepId = getFirstStepIdForCurrentChain(state);
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [chainId]: {
            ...state.protocols[chainId],
            steps: newSteps,
            currentStepId: firstStepId,
            innerState: null,
          },
        },
      };
    }

    case 'SetSharedState': {
      const chainId = getCurrentChainId(state);
      const stepId = getCurrentStepIdForCurrentChain(state);
      let protocolState = {...state.protocols[chainId]};
      action.values.forEach((field) => {
        const key = getKey(field);
        const value = getValue(field);
        protocolState = {
          ...protocolState,
          [key]: value,
        };
      });

      return {
        ...state,
        protocols: {
          ...state.protocols,
          [chainId]: {
            ...protocolState,
            steps: {
              ...protocolState.steps,
              [stepId]: {
                ...protocolState.steps[stepId],
                isCompleted: !!action.isCompleted,
              },
            },
          },
        },
      };
    }

    case 'SetChainCurrentStepId':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            currentStepId: action.currentStepId,
          },
        },
      };

    case 'SetChainNetwork':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            network: action.network,
          },
        },
      };

    case 'SetNetwork': {
      const chainId = getCurrentChainId(state);

      return {
        ...state,
        protocols: {
          ...state.protocols,
          [chainId]: {
            ...state.protocols[chainId],
            network: action.network,
          },
        },
      };
    }

    case 'SetChainProtocol':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            protocol: action.protocol,
          },
        },
      };

    case 'SetStepIsCompleted':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            steps: {
              ...state.protocols[action.chainId].steps,
              [action.stepId]: {
                ...state.protocols[action.chainId].steps[action.stepId],
                isCompleted: action.value,
              },
            },
          },
        },
      };

    case 'SetIsCompleted': {
      const chainId = getCurrentChainId(state);
      const stepId = getCurrentStepIdForCurrentChain(state);
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [chainId]: {
            ...state.protocols[chainId],
            steps: {
              ...state.protocols[chainId].steps,
              [stepId]: {
                ...state.protocols[chainId].steps[stepId],
                isCompleted: true,
              },
            },
          },
        },
      };
    }

    case 'ClearStepProgression': {
      const newSteps = clearStepProgression(getStepsForCurrentChain(state));
      const firstStepId = getFirstStepIdForCurrentChain(state);
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            steps: newSteps,
            currentStepId: firstStepId,
          },
        },
      };
    }

    case 'SetStepInnerState':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            innerState: {
              ...state.protocols[action.chainId].innerState,
              [action.innerStateId]: action.value,
            },
          },
        },
      };

    default:
      return state;
  }
}

// Global State function, upmost level
export const getCurrentChainId = (state: GlobalStateT) => {
  return state.currentChainId as CHAINS;
};

// Current chain function
export const getLogoUrlForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].logoUrl;
};

export const getLabelForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].label;
};

export const getNetworkForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].network;
};

export const getProtocolForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].protocol;
};

export const getCurrentStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].currentStepId;
};

export const getNumberOfStepForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].numberOfStep;
};

export const getStepsForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].steps;
};

export const getFirstStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].firstStepId;
};

export const getLastStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].lastStepId;
};

// Current Step Id function
export const getNextStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  const nextStepId = state.protocols[chainId].steps[currentStepId].nextStepId;
  return nextStepId ? nextStepId : getLastStepIdForCurrentChain(state);
};

export const getPreviousStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  const previousStepId =
    state.protocols[chainId].steps[currentStepId].previousStepId;
  return previousStepId ? previousStepId : getFirstStepIdForCurrentChain(state);
};

export const getNextStepForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const nextStepId = getNextStepId(state);
  return nextStepId === null
    ? null
    : state.protocols[chainId].steps[nextStepId];
};

export const getPreviousStepForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const previousStep = getPreviousStepId(state);
  return previousStep === null
    ? null
    : state.protocols[chainId].steps[previousStep];
};

export const getTitleForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].title;
};

export const getPositionForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].position;
};

export const getIsCompletedForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isCompleted;
};

export const getIsSkippableForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isSkippable;
};

export const getIsOneColumn = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isOneColumn;
};

export const getIsVisitedForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isSkippable;
};

export const isFirstStepForCurrentStepId = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    getFirstStepIdForCurrentChain(state)
  );
};

export const isConnectionStep = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    PROTOCOL_STEPS_ID.CHAIN_CONNECTION
  );
};

export const isLastStepForCurrentStepId = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    getLastStepIdForCurrentChain(state)
  );
};

export const isCompletedForCurrentStepId = (state: GlobalStateT) => {
  const isCompleted =
    getIsSkippableForCurrentStepId(state) ||
    getIsCompletedForCurrentStepId(state);
  return isCompleted;
};

// Inner state functions
export const getChainInnerState = (
  state: GlobalStateT,
  chainId: CHAINS,
  stateId: PROTOCOL_INNER_STATES_ID,
) => {
  return state.protocols[chainId].innerState?.[stateId] as string | null;
};

export const getChainInnerStates = (state: GlobalStateT): InnerStateT => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].innerState ?? ({} as InnerStateT);
};

//-------------------------------------------------
const GlobalContext = createContext<{
  state: GlobalStateT;
  dispatch: Dispatch<Action>;
}>({
  state: initialGlobalState,
  dispatch: () => null,
});

const useGlobalState = () => useContext(GlobalContext);

export {GlobalContext, initialGlobalState, globalStateReducer, useGlobalState};
