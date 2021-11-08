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
import {
  getChainId,
  getStepId,
  getSteps,
  getFirstStepId,
  isCompletedStep,
} from 'utils/context';

type StepsReducerHelperT = {
  index: number;
  data: ProtocolStepsT;
};

const stepsReducerHelper = (
  {index, data}: {index: number; data: ProtocolStepsT},
  step: StepType,
): {
  index: number;
  data: ProtocolStepsT;
} => {
  const id = step.id;
  const title = step.title;
  const isOneColumn = !!step.isOneColumn;
  const isSkippable = !!step.skippable || isOneColumn;
  const isCompleted = isSkippable ? true : false;
  const position = index + 1;
  const previousStepId =
    index === 0 ? null : (Object.keys(data)[index - 1] as PROTOCOL_STEPS_ID);
  data[id] = {
    id,
    title,
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
  const numberOfSteps = stepsIds.length;
  const firstStepId = stepsIds[0];
  const lastStepId = stepsIds[numberOfSteps - 1];

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
    numberOfSteps,
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

// Deprecated
const clearStepProgression = (steps: ProtocolStepsT): ProtocolStepsT => {
  return Object.keys(steps).reduce((steps, stepId) => {
    const step = steps[stepId as PROTOCOL_STEPS_ID];
    const isOneColumn = step.isOneColumn;
    const isSkippable = step.isSkippable;
    step.isCompleted = isOneColumn || isSkippable;
    return steps;
  }, steps);
};

const initialGlobalState = {
  currentChainId: undefined,
  protocols: buildInitialState(),
};

export type Action =
  | {type: 'SetCurrentChainId'; currentChainId: CHAINS}
  | {
      type: 'SetIsCompleted';
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
  // Deprecated
  | {type: 'SetChainNetwork'; chainId: CHAINS; network: NETWORKS}
  // Deprecated
  | {type: 'SetChainProtocol'; chainId: CHAINS; protocol: PROTOCOLS}
  // Deprecated
  | {
      type: 'SetChainCurrentStepId';
      chainId: CHAINS;
      currentStepId: PROTOCOL_STEPS_ID;
    }
  // Deprecated
  | {
      type: 'SetStepIsCompleted';
      chainId: CHAINS;
      stepId: PROTOCOL_STEPS_ID;
      value: boolean;
    }
  // Deprecated
  | {
      type: 'ClearStepProgression';
      chainId: CHAINS;
    }
  // Deprecated
  | {
      type: 'Clear';
    }
  // Deprecated
  | {
      type: 'SetNetwork';
      network: NETWORKS;
    }
  // Deprecated
  | {
      type: 'SetStepInnerState';
      chainId: CHAINS;
      innerStateId: PROTOCOL_INNER_STATES_ID;
      value: string | null;
    };

function globalStateReducer(state: GlobalStateT, action: Action): GlobalStateT {
  const getKey = (field: any) => Object.keys(field)[0];
  const getValue = (field: any) => Object.values(field)[0];

  switch (action.type) {
    case 'SetCurrentChainId':
      return {...state, currentChainId: action.currentChainId};

    case 'SetIsCompleted': {
      const chainId = getChainId(state);
      const stepId = getStepId(state);
      console.log(chainId, stepId);
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

    case 'SetInnerState': {
      const chainId = getChainId(state);
      const stepId = getStepId(state);
      const isCompleted = action.isCompleted ? true : isCompletedStep(state);
      const innerState = state.protocols[chainId].innerState;
      console.log(action.values);
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
                isCompleted,
              },
            },
            innerState: {...newInnerState},
          },
        },
      };
    }

    case 'SetSharedState': {
      const chainId = getChainId(state);
      const stepId = getStepId(state);
      const isCompleted = action.isCompleted ? true : isCompletedStep(state);
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
                isCompleted,
              },
            },
          },
        },
      };
    }

    // Deprecated
    case 'Clear': {
      const newSteps = clearStepProgression(getSteps(state));
      const chainId = getChainId(state);
      const firstStepId = getFirstStepId(state);
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

    // Deprecated
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

    // Deprecated
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

    // Deprecated
    case 'SetNetwork': {
      const chainId = getChainId(state);

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

    // Deprecated
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

    // Deprecated
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

    // Deprecated
    case 'ClearStepProgression': {
      const newSteps = clearStepProgression(getSteps(state));
      const firstStepId = getFirstStepId(state);
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

    // Deprecated
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
// Deprecated
export const getCurrentChainId = (state: GlobalStateT) => {
  return state.currentChainId as CHAINS;
};

// Current chain function
// Deprecated
export const getLabelForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].label;
};
// Deprecated
export const getNetworkForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].network;
};
// Deprecated
export const getCurrentStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].currentStepId;
};
// Deprecated
export const getStepsForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].steps;
};
// Deprecated
export const getFirstStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].firstStepId;
};
// Deprecated
export const getLastStepIdForCurrentChain = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  return state.protocols[chainId].lastStepId;
};

// Current Step Id function
// Deprecated
export const getNextStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  const nextStepId = state.protocols[chainId].steps[currentStepId].nextStepId;
  return nextStepId ? nextStepId : getLastStepIdForCurrentChain(state);
};
// Deprecated
export const getPreviousStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  const previousStepId =
    state.protocols[chainId].steps[currentStepId].previousStepId;
  return previousStepId ? previousStepId : getFirstStepIdForCurrentChain(state);
};
// Deprecated
export const getNextStepForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const nextStepId = getNextStepId(state);
  return nextStepId === null
    ? null
    : state.protocols[chainId].steps[nextStepId];
};
// Deprecated
export const getPreviousStepForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const previousStep = getPreviousStepId(state);
  return previousStep === null
    ? null
    : state.protocols[chainId].steps[previousStep];
};
// Deprecated
export const getTitleForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].title;
};
// Deprecated
export const getPositionForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].position;
};
// Deprecated
export const getIsCompletedForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isCompleted;
};
// Deprecated
export const getIsSkippableForCurrentStepId = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isSkippable;
};
// Deprecated
export const getIsOneColumn = (state: GlobalStateT) => {
  const chainId = getCurrentChainId(state);
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  return state.protocols[chainId].steps[currentStepId].isOneColumn;
};
// Deprecated
export const isFirstStepForCurrentStepId = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    getFirstStepIdForCurrentChain(state)
  );
};
// Deprecated
export const isConnectionStep = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    PROTOCOL_STEPS_ID.CHAIN_CONNECTION
  );
};
// Deprecated
export const isLastStepForCurrentStepId = (state: GlobalStateT) => {
  return (
    getCurrentStepIdForCurrentChain(state) ===
    getLastStepIdForCurrentChain(state)
  );
};
// Deprecated
export const isCompletedForCurrentStepId = (state: GlobalStateT) => {
  const isCompleted =
    getIsSkippableForCurrentStepId(state) ||
    getIsCompletedForCurrentStepId(state);
  return isCompleted;
};

// Inner state functions
// Deprecated
export const getChainInnerState = (
  state: GlobalStateT,
  chainId: CHAINS,
  stateId: PROTOCOL_INNER_STATES_ID,
) => {
  return state.protocols[chainId].innerState?.[stateId] as string | null;
};
// Deprecated
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
