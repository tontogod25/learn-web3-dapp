export const VERSION = 'DEPRECATED';
/*
import {CHAINS} from 'types';

const pack = (map: Map<string, boolean>) => {
  return JSON.stringify(Array.from(map.entries()));
};

const unpack = (str: string | undefined): Map<string, boolean> => {
  if (str === undefined) return new Map();
  return new Map(Array.from(JSON.parse(str)));
};

const setStepsStatus = (
  stepsStatus: string | undefined,
  stepId: string,
  value: boolean,
) => {
  const stepsStatusMap = unpack(stepsStatus);
  return pack(stepsStatusMap.set(stepId, value));
};

const getStepsStatus = (stepsStatus: string | undefined, stepId: string) => {
  const stepsStatusMap = unpack(stepsStatus);
  return stepsStatusMap.get(stepId);
};

const resetStepsStatus = (stepsStatus: string | undefined) => {
  return JSON.stringify(
    Array.from(JSON.parse(stepsStatus as string)).map((key, _value) => [
      key,
      false,
    ]),
  );
};

const setActionSetStepStatusFromChainId = (
  chainId: string,
  stepsStatus: string,
) => {
  switch (chainId) {
    case CHAINS.SOLANA:
      return {type: 'SetSolanaStepsStatus', stepsStatus};
    case CHAINS.AVALANCHE:
      return {type: 'SetAvalancheStepsStatus', stepsStatus};
    case CHAINS.NEAR:
      return {type: 'SetNearStepsStatus', stepsStatus};
    case CHAINS.POLYGON:
      return {type: 'SetPolygonStepsStatus', stepsStatus};
    case CHAINS.CELO:
      return {type: 'SetCeloStepsStatus', stepsStatus};
    case CHAINS.TEZOS:
      return {type: 'SetTezosStepsStatus', stepsStatus};
    case CHAINS.POLKADOT:
      return {type: 'SetPolkadotStepsStatus', stepsStatus};
    case CHAINS.SECRET:
      return {type: 'SetSecretStepsStatus', stepsStatus};
    default:
      return {type: 'SetTheGraphStepsStatus', stepsStatus};
  }
};

export {
  setStepsStatus,
  getStepsStatus,
  setActionSetStepStatusFromChainId,
  resetStepsStatus,
};
*/
