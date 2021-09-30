import {createContext, Dispatch, useContext} from 'react';

export type GlobalState = {
  currentStepIndex: number;
  highestCompletedStepIndex: number;
  chainId?: string;
  // Solana global State
  solana: {
    network: string;
    address?: string;
    secret?: string;
    programId?: string;
    greeter?: string;
  };
  // Avalanche global State
  avalanche: {
    network: string;
    secret?: string;
    address?: string;
  };
  // Polygon global State
  polygon: {
    network?: string;
    address?: string;
  };
};

type Action =
  | {type: 'SetCurrentStepIndex'; currentStepIndex: number}
  | {type: 'SetHighestCompletedStepIndex'; highestCompletedStepIndex: number}
  | {type: 'SetChainId'; chainId: string | undefined}
  // Solana actions
  | {type: 'SetSolanaNetwork'; network: string}
  | {type: 'SetSolanaAddress'; address?: string}
  | {type: 'SetSolanaSecret'; secret?: string}
  | {type: 'SetSolanaProgramId'; programId?: string}
  | {type: 'SetSolanaGreeter'; greeter?: string}
  // Avalanche Actions
  | {type: 'SetAvalancheNetwork'; network: string}
  | {type: 'SetAvalancheAddress'; address?: string}
  | {type: 'SetAvalancheSecret'; secret?: string}
  // Polygon Actions
  | {type: 'SetPolygonNetwork'; network: string}
  | {type: 'SetPolygonAddress'; address?: string};

const initialGlobalState = {
  currentStepIndex: 0,
  highestCompletedStepIndex: 0,
  // Solana initial state
  solana: {
    network: 'devnet',
  },
  // Avalanche initial state
  avalanche: {
    network: 'datahub',
  },
  // Polygon initial state
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
    // Avalanche State
    case 'SetAvalancheNetwork': {
      return {
        ...state,
        avalanche: {
          ...state.avalanche,
          network: action.network,
        },
      };
    }
    case 'SetAvalancheAddress': {
      return {
        ...state,
        avalanche: {
          ...state.avalanche,
          address: action.address,
        },
      };
    }
    case 'SetAvalancheSecret': {
      return {
        ...state,
        avalanche: {
          ...state.avalanche,
          secret: action.secret,
        },
      };
    }
    // Polygon State
    case 'SetPolygonAddress': {
      return {
        ...state,
        polygon: {
          ...state.polygon,
          address: action.address,
        },
      };
    }
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
