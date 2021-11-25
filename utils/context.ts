import {
  GlobalStateT,
  LocalStorageStateT,
  CHAINS,
  PROTOCOL_STEPS_ID,
  PROTOCOL_INNER_STATES_ID,
  NETWORKS,
  ProtocolStepsT,
  ProtocolStepT,
} from 'types';

export const prepareGlobalStateForStorage = (
  globalState: GlobalStateT,
): LocalStorageStateT => {
  const chains = Object.keys(globalState.protocols) as CHAINS[];

  return chains.reduce((acc: LocalStorageStateT, el: CHAINS) => {
    acc[el] = {
      currentStepId: globalState.protocols[el].currentStepId,
      innerState: globalState.protocols[el].innerState,
    };
    return acc;
  }, {} as LocalStorageStateT);
};

export const prepareGlobalState = (
  localStorage: LocalStorageStateT,
  initialGlobalState: GlobalStateT,
): GlobalStateT => {
  const chains = Object.keys(initialGlobalState.protocols) as CHAINS[];
  const newProtocols = chains.reduce(
    (acc: GlobalStateT['protocols'], el: CHAINS) => {
      acc[el] = {
        ...initialGlobalState.protocols[el],
        ...(localStorage ? localStorage[el] : {}),
      };
      return acc;
    },
    initialGlobalState.protocols,
  );

  return {
    ...initialGlobalState,
    protocols: newProtocols,
  };
};

// New read-only function for the global state
//
// Global State function, upmost level
export const getChainId = (state: GlobalStateT): CHAINS => {
  return state.currentChainId as CHAINS;
};

export const getChainLabel = (state: GlobalStateT): string => {
  const chainId = getChainId(state);
  return state.protocols[chainId].label;
};

export const getNetwork = (state: GlobalStateT): NETWORKS => {
  const chainId = getChainId(state);
  return state.protocols[chainId].network;
};

export const getSteps = (state: GlobalStateT): ProtocolStepsT => {
  const chainId = getChainId(state);
  return state.protocols[chainId].steps;
};

export const getStepId = (state: GlobalStateT): PROTOCOL_STEPS_ID => {
  const chainId = getChainId(state);
  return state.protocols[chainId].currentStepId;
};

// Current Step Id function
export const getFirstStepId = (state: GlobalStateT): PROTOCOL_STEPS_ID => {
  const chainId = getChainId(state);
  return state.protocols[chainId].firstStepId;
};

export const getLastStepId = (state: GlobalStateT): PROTOCOL_STEPS_ID => {
  const chainId = getChainId(state);
  return state.protocols[chainId].lastStepId;
};

export const getPreviousStepId = (state: GlobalStateT): PROTOCOL_STEPS_ID => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  const previousStepId =
    state.protocols[chainId].steps[currentStepId].previousStepId;
  return previousStepId ? previousStepId : getFirstStepId(state);
};

export const getNextStepId = (state: GlobalStateT): PROTOCOL_STEPS_ID => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  const nextStepId = state.protocols[chainId].steps[currentStepId].nextStepId;
  return nextStepId ? nextStepId : getLastStepId(state);
};

export const getPreviousStep = (state: GlobalStateT): ProtocolStepT | null => {
  const chainId = getChainId(state);
  const previousStep = getPreviousStepId(state);
  return previousStep === null
    ? null
    : state.protocols[chainId].steps[previousStep];
};

export const getNextStep = (state: GlobalStateT): ProtocolStepT | null => {
  const chainId = getChainId(state);
  const nextStepId = getNextStepId(state);
  return nextStepId === null
    ? null
    : state.protocols[chainId].steps[nextStepId];
};

export const getStepIndex = (state: GlobalStateT): number => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  return state.protocols[chainId].steps[currentStepId].position;
};

export const getStepTitle = (state: GlobalStateT): string => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  return state.protocols[chainId].steps[currentStepId].title;
};

// Predicat's functions
export const isConnectionStep = (state: GlobalStateT): boolean => {
  return getStepId(state) === PROTOCOL_STEPS_ID.CHAIN_CONNECTION;
};

export const isOneColumnStep = (state: GlobalStateT): boolean => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  return state.protocols[chainId].steps[currentStepId].isOneColumn;
};

export const isFirstStep = (state: GlobalStateT) => {
  return getStepId(state) === getFirstStepId(state);
};

export const isLastStep = (state: GlobalStateT): boolean => {
  return getStepId(state) === getLastStepId(state);
};

export const isCompletedStep = (state: GlobalStateT): boolean => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);

  return (
    isOneColumnStep(state) ||
    isSkippableStep(state) ||
    state.protocols[chainId].steps[currentStepId].isCompleted
  );
};

export const isSkippableStep = (state: GlobalStateT): boolean => {
  const chainId = getChainId(state);
  const currentStepId = getStepId(state);
  return state.protocols[chainId].steps[currentStepId].isSkippable;
};

// Inner state functions
export const getChainInnerState = (
  state: GlobalStateT,
  stateId: PROTOCOL_INNER_STATES_ID,
): string | null => {
  const chainId = getChainId(state);
  return state.protocols[chainId].innerState?.[stateId] as string | null;
};

// This function is temporary
// When all the pathways will be migrate it will rewrite and
// it will take 5 line of code and it will be replace by something like this
// The issue here is link to the case of the enum ...
/*
export const getChainInnerState = (
  state: GlobalStateT,
  stateId: PROTOCOL_INNER_STATES_ID,
) => {
  const chainId = getChainId(state);
  return state.protocols[chainId].innerState?.[stateId] as string | null;
};
*/
export const getInnerState = (state: GlobalStateT) => {
  const innerState: any = {};
  const network = getNetwork(state);
  const secret = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.SECRET);
  if (secret) {
    innerState.secret = secret;
  }
  const privateKey = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.PRIVATE_KEY,
  );
  if (privateKey) {
    innerState.privateKey = privateKey;
  }
  const publicKey = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.PUBLIC_KEY,
  );
  if (publicKey) {
    innerState.publicKey = publicKey;
  }
  const address = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.ADDRESS);
  if (address) {
    innerState.address = address;
  }
  const contractId = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.CONTRACT_ID,
  );
  if (contractId) {
    innerState.contractId = contractId;
  }
  const mnemonic = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.MNEMONIC);
  if (mnemonic) {
    innerState.mnemonic = mnemonic;
  }
  const accountId = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.ACCOUNT_ID,
  );
  if (accountId) {
    innerState.accountId = accountId;
  }
  const password = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.PASSWORD);
  if (password) {
    innerState.password = password;
  }
  const email = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.EMAIL);
  if (email) {
    innerState.email = email;
  }
  const programId = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.PROGRAM_ID,
  );
  if (programId) {
    innerState.programId = programId;
  }
  const greeter = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.GREETER);
  if (greeter) {
    innerState.greeter = greeter;
  }
  const metamaskNetworkName = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.METAMASK_NETWORK_NAME,
  );
  if (metamaskNetworkName) {
    innerState.metamaskNetworkName = metamaskNetworkName;
  }
  const did = getChainInnerState(state, PROTOCOL_INNER_STATES_ID.DID);
  if (did) {
    innerState.did = did;
  }
  const userName = getChainInnerState(
    state,
    PROTOCOL_INNER_STATES_ID.USER_NAME,
  );
  if (userName) {
    innerState.userName = userName;
  }

  return {network, ...innerState};
};

/* Important stuff to use later
// import {defaultsDeep, difference, keys, omit} from 'lodash';
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
*/
