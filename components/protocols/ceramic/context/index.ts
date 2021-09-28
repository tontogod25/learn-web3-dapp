import {createContext, Dispatch, useContext} from 'react';

export type State = {
  network: string;
  address?: string;
  DID?: string;
};

type Action =
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetDID'; DID?: string};

const initialState = {
  network: 'testnet',
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    case 'SetDID':
      return {...state, DID: action.DID};
    default:
      return state;
  }
}

const CeramicContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useAppState = () => useContext(CeramicContext);

export {CeramicContext, initialState, appStateReducer, useAppState};
