import {CHAINS, GlobalStateT, LocalStorageStateT} from 'types';

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
