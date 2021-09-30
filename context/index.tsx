import {createContext, Dispatch, useContext} from 'react';

export type GlobalState = {
  currentStepIndex: number;
  highestCompletedStepIndex: number;
  chainId?: string;
  // Solana global state
  solana: {
    network: string;
    address?: string;
    secret?: string;
    programId?: string;
    greeter?: string;
    stepsStatus?: string;
  };
  // Avalanche global state
  avalanche: {
    network: string;
    secret?: string;
    address?: string;
    stepsStatus?: string;
  };
  // Near global state
  near: {
    network: string;
    accountId?: string;
    secret?: string;
    contractId?: string;
    stepsStatus?: string;
  };
  // Polygon global state
  polygon: {
    network?: string;
    address?: string;
    stepsStatus?: string;
  };
  // Celo global state
  celo: {
    network: string;
    stepsStatus?: string;
  };
  // The Graph global state
  the_graph: {
    network: string;
    stepsStatus?: string;
  };
  // Polkadot global state
  polkadot: {
    network: string;
    stepsStatus?: string;
  };
  // Tezos global state
  tezos: {
    network: string;
    stepsStatus?: string;
  };
  // Secret global state
  secret: {
    network: string;
    stepsStatus?: string;
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
  | {type: 'SetSolanaStepsStatus'; stepsStatus?: string}
  // Avalanche actions
  | {type: 'SetAvalancheNetwork'; network: string}
  | {type: 'SetAvalancheAddress'; address?: string}
  | {type: 'SetAvalancheSecret'; secret?: string}
  | {
      type: 'SetAvalancheStepsStatus';
      stepsStatus?: string;
    }
  // Near actions
  | {type: 'SetNearNetwork'; network: string}
  | {type: 'SetNearAccountId'; accountId?: string}
  | {type: 'SetNearSecret'; secret?: string}
  | {type: 'SetNearConractId'; contractId?: string}
  | {type: 'SetNearStepsStatus'; stepsStatus?: string}
  // Polygon actions
  | {type: 'SetPolygonNetwork'; network: string | undefined}
  | {type: 'SetPolygonAddress'; address?: string | undefined}
  | {type: 'SetPolygonStepsStatus'; stepsStatus?: string}
  // Celo actions
  | {type: 'SetCeloNetwork'; network: string}
  | {type: 'SetCeloStepsStatus'; stepsStatus?: string}
  // Tezos actions
  | {type: 'SetTezosNetwork'; network: string}
  | {type: 'SetTezosStepsStatus'; stepsStatus?: string}
  // Polkadot actions
  | {type: 'SetPolkadotNetwork'; network: string}
  | {type: 'SetPolkadotStepsStatus'; stepsStatus?: string}
  // Secret actions
  | {type: 'SetSecretNetwork'; network: string}
  | {type: 'SetSecretStepsStatus'; stepsStatus?: string}
  // The Graph actions
  | {type: 'SetTheGraphNetwork'; network: string}
  | {type: 'SetTheGraphStepsStatus'; stepsStatus?: string};

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
  // Near initial state
  near: {
    network: 'datahub',
  },
  // Polygon initial state
  polygon: {
    network: 'datahub',
  },
  // Celo initial state
  celo: {
    network: 'datahub',
  },
  // The Graph initial state
  network: {
    network: 'datahub',
  },
  // Secret initial state
  secret: {
    network: 'datahub',
  },
  // Tezos initial state
  tezos: {
    network: 'datahub',
  },
  // Polkadot initial state
  polkadot: {
    network: 'datahub',
  },
  // The Graph initial state
  the_graph: {
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
    case 'SetSolanaStepsStatus': {
      return {
        ...state,
        solana: {
          ...state.solana,
          stepsStatus: action.stepsStatus,
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
    case 'SetAvalancheStepsStatus': {
      return {
        ...state,
        avalanche: {
          ...state.avalanche,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Near State
    case 'SetNearNetwork': {
      return {
        ...state,
        near: {
          ...state.near,
          network: action.network,
        },
      };
    }
    case 'SetNearAccountId': {
      return {
        ...state,
        near: {
          ...state.near,
          accountId: action.accountId,
        },
      };
    }
    case 'SetNearSecret': {
      return {
        ...state,
        near: {
          ...state.near,
          secret: action.secret,
        },
      };
    }
    case 'SetNearConractId': {
      return {
        ...state,
        near: {
          ...state.near,
          contractId: action.contractId,
        },
      };
    }
    case 'SetNearStepsStatus': {
      return {
        ...state,
        near: {
          ...state.near,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Polygon state
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
    case 'SetPolygonStepsStatus': {
      return {
        ...state,
        polygon: {
          ...state.polygon,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Celo state
    case 'SetCeloNetwork': {
      return {
        ...state,
        celo: {
          ...state.celo,
          network: action.network,
        },
      };
    }
    case 'SetCeloStepsStatus': {
      return {
        ...state,
        celo: {
          ...state.celo,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Polkadot state
    case 'SetPolkadotNetwork': {
      return {
        ...state,
        polkadot: {
          ...state.polkadot,
          network: action.network,
        },
      };
    }
    case 'SetPolkadotStepsStatus': {
      return {
        ...state,
        polkadot: {
          ...state.polkadot,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Tezos state
    case 'SetTezosNetwork': {
      return {
        ...state,
        tezos: {
          ...state.tezos,
          network: action.network,
        },
      };
    }
    case 'SetTezosStepsStatus': {
      return {
        ...state,
        tezos: {
          ...state.tezos,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // Secret state
    case 'SetSecretStepsStatus': {
      return {
        ...state,
        secret: {
          ...state.secret,
          stepsStatus: action.stepsStatus,
        },
      };
    }
    // The Graph state
    case 'SetTheGraphNetwork': {
      return {
        ...state,
        the_graph: {
          ...state.the_graph,
          network: action.network,
        },
      };
    }
    case 'SetTheGraphStepsStatus': {
      return {
        ...state,
        the_graph: {
          ...state.the_graph,
          stepsStatus: action.stepsStatus,
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
