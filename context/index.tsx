import {createContext, Dispatch, useContext} from 'react';
import {CHAINS_CONFIG} from 'lib/constants';
import {
  GlobalStateT,
  ProtocolStepsT,
  ProtocolsStateT,
  CHAINS,
  StepType,
  PROTOCOL_STEPS_ID,
  NETWORK,
  PROTOCOL,
  PROTOCOL_INNER_STATES_ID,
  InnerStateTypeT,
  PROTOCOL_STEPS_POSITION,
} from 'types';

const stepsReducerHelper = (
  progress: ProtocolStepsT,
  step: StepType,
): ProtocolStepsT => {
  const id = step.id as PROTOCOL_STEPS_ID;
  const title = step.title;
  const isSkippable = !!step.skippable;
  const isCompleted = isSkippable ? true : false;
  const isVisited = isSkippable ? true : false;
  const position = step.position;
  progress[id] = {
    id,
    title,
    isVisited,
    isCompleted,
    isSkippable,
    position,
  };
  return progress;
};

const protocolsReducerHelper = (
  protocolsData: ProtocolsStateT,
  chainId: CHAINS,
): ProtocolsStateT => {
  protocolsData[chainId] = {
    id: CHAINS_CONFIG[chainId].id,
    label: CHAINS_CONFIG[chainId].label,
    logoUrl: CHAINS_CONFIG[chainId].logoUrl,
    network: CHAINS_CONFIG[chainId].defaultNetwork,
    protocol: CHAINS_CONFIG[chainId].defaultProtocol,
    isActive: CHAINS_CONFIG[chainId].active,
    currentStepIndex: 0,
    currentStepId: PROTOCOL_STEPS_ID.PROJECT_SETUP,
    innerState: {},
    steps: CHAINS_CONFIG[chainId].steps.reduce(
      (progress, stepElement) => stepsReducerHelper(progress, stepElement),
      {} as ProtocolStepsT,
    ),
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

const initialGlobalState = {
  currentChainId: undefined,
  protocols: buildInitialState(),
};

// console.log(JSON.stringify(initialGlobalState, null, 2));

type Action =
  | {type: 'SetChainId'; currentChainId: CHAINS}
  | {
      type: 'SetChainCurrentStepIndex';
      chainId: CHAINS;
      currentStepIndex: number;
    }
  | {type: 'SetChainNetwork'; chainId: CHAINS; network: NETWORK}
  | {type: 'SetChainProtocol'; chainId: CHAINS; protocol: PROTOCOL}
  | {type: 'SetChainIsActive'; chainId: CHAINS; isActive: boolean}
  | {
      type: 'SetChainCurrentStepId';
      chainId: CHAINS;
      currentStepId: PROTOCOL_STEPS_ID;
    }
  | {
      type: 'SetChainProgressIsVisited';
      chainId: CHAINS;
      stepId: PROTOCOL_STEPS_ID;
      value: boolean;
    }
  | {
      type: 'SetChainProgressIsCompleted';
      chainId: CHAINS;
      stepId: PROTOCOL_STEPS_ID;
      value: boolean;
    }
  | {
      type: 'SetChainInnerState';
      chainId: CHAINS;
      innerStateId: PROTOCOL_INNER_STATES_ID;
      value: InnerStateTypeT;
    };

function globalStateReducer(state: GlobalStateT, action: Action): GlobalStateT {
  switch (action.type) {
    case 'SetChainId':
      return {...state, currentChainId: action.currentChainId};

    case 'SetChainCurrentStepIndex':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            currentStepIndex: action.currentStepIndex,
          },
        },
      };

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

    case 'SetChainIsActive':
      return {
        ...state,
        protocols: {
          ...state.protocols,
          [action.chainId]: {
            ...state.protocols[action.chainId],
            isActive: action.isActive,
          },
        },
      };

    case 'SetChainProgressIsCompleted':
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

    case 'SetChainProgressIsVisited':
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
                isVisited: action.value,
              },
            },
          },
        },
      };

    case 'SetChainInnerState':
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

export const getCurrentChainId = (state: GlobalStateT) => {
  return state.currentChainId as CHAINS;
};

export const getChainLogoUrl = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].logoUrl;
};

export const getChainLabel = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].label;
};

export const getChainId = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].id;
};

export const getChainNetwork = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].network;
};

export const getChainProtocol = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].protocol;
};

export const getChainStatus = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].isActive;
};

export const getChainInnerStates = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].innerState;
};

export const getChainCurrentStepIndex = (
  state: GlobalStateT,
  chainId: CHAINS,
) => {
  return state.protocols[chainId].currentStepIndex;
};

export const getChainCurrentStepId = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].currentStepId;
};

export const getChainPreviousStep = (state: GlobalStateT, chainId: CHAINS) => {
  const currentStepId = getChainCurrentStepId(state, chainId);
  const currentPosition =
    state.protocols[chainId].steps[currentStepId].position;
  if (currentPosition === PROTOCOL_STEPS_POSITION.FIRST) {
    return null;
  } else {
    return Object.values(getChainSteps(state, chainId)).filter(
      (step) => step.position === currentPosition - 1,
    )[0];
  }
};

export const getChainNextStep = (state: GlobalStateT, chainId: CHAINS) => {
  const currentStepId = getChainCurrentStepId(state, chainId);
  const currentPosition =
    state.protocols[chainId].steps[currentStepId].position;
  if (currentPosition === PROTOCOL_STEPS_POSITION.LAST) {
    return null;
  } else {
    return Object.values(getChainSteps(state, chainId)).filter(
      (step) => step.position === currentPosition + 1,
    )[0];
  }
};

export const getChainNextStepId = (state: GlobalStateT, chainId: CHAINS) => {
  return getChainNextStep(state, chainId)?.id;
};

export const getChainPreviousStepId = (
  state: GlobalStateT,
  chainId: CHAINS,
) => {
  return getChainPreviousStep(state, chainId)?.id;
};

export const getChainInnerState = (
  state: GlobalStateT,
  chainId: CHAINS,
  stateId: PROTOCOL_INNER_STATES_ID,
) => {
  return state.protocols[chainId].innerState[stateId];
};

export const getChainStepsIsCompleted = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].isCompleted;
};

export const getChainStepsIsVisited = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].isVisited;
};

export const getChainStepsId = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].id;
};

export const getChainSteps = (state: GlobalStateT, chainId: CHAINS) => {
  return state.protocols[chainId].steps;
};

export const getChainStepsTitle = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].title;
};

export const getChainStepsPosition = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].position;
};

export const getChainStepsIsSkippable = (
  state: GlobalStateT,
  chainId: CHAINS,
  stepId: PROTOCOL_STEPS_ID,
) => {
  return state.protocols[chainId].steps[stepId].isSkippable;
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
