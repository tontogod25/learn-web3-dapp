import {createContext, Dispatch, useContext} from 'react';

export type GlobalState = {
  currentStepIndex: number;
  highestCompletedStepIndex: number;
  chainId?: string;
  solana: {
    network: string;
    address?: string;
    secret?: string;
    programId?: string;
    greeter?: string;
  };
  polygon: {
    network: string;
  };
};

type Action =
  | {type: 'SetCurrentStepIndex'; currentStepIndex: number}
  | {type: 'SetHighestCompletedStepIndex'; highestCompletedStepIndex: number}
  | {type: 'SetChainId'; chainId: string | undefined}
  | {type: 'SetSolanaNetwork'; network: string}
  | {type: 'SetSolanaAddress'; address?: string}
  | {type: 'SetSolanaSecret'; secret?: string}
  | {type: 'SetSolanaProgramId'; programId?: string}
  | {type: 'SetSolanaGreeter'; greeter?: string}
  | {type: 'SetPolygonNetwork'; network: string};

const initialGlobalState = {
  currentStepIndex: 0,
  highestCompletedStepIndex: 0,
  solana: {
    network: 'devnet',
  },
  polygon: {
    network: 'datahub',
  },
};

function globalStateReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    // Shared State
    case 'SetCurrentStepIndex':
      return {...state, currentStepIndex: action.currentStepIndex};
    case 'SetHighestCompletedStepIndex':
      return {
        ...state,
        highestCompletedStepIndex: action.highestCompletedStepIndex,
      };
    case 'SetChainId':
      return {...state, chainId: action.chainId};
    // Solana State
    case 'SetSolanaNetwork': {
      return {
        ...state,
        solana: {
          ...state.solana,
          network: action.network,
        },
      };
    }
    case 'SetSolanaAddress': {
      return {
        ...state,
        solana: {
          ...state.solana,
          address: action.address,
        },
      };
    }
    case 'SetSolanaSecret': {
      return {
        ...state,
        solana: {
          ...state.solana,
          secret: action.secret,
        },
      };
    }
    case 'SetSolanaGreeter': {
      return {
        ...state,
        solana: {
          ...state.solana,
          greeter: action.greeter,
        },
      };
    }
    case 'SetSolanaProgramId': {
      return {
        ...state,
        solana: {
          ...state.solana,
          programId: action.programId,
        },
      };
    }
    // Polygon State
    case 'SetPolygonNetwork': {
      return {
        ...state,
        polygon: {
          ...state.polygon,
          network: action.network,
        },
      };
    }
    default:
      return state;
  }
}

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Action>;
}>({
  state: initialGlobalState,
  dispatch: () => null,
});

const useGlobalState = () => useContext(GlobalContext);

export {GlobalContext, initialGlobalState, globalStateReducer, useGlobalState};
