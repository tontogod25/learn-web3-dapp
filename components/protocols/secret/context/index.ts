import {createContext, Dispatch} from 'react';

export type State = {
  index: number;
  network: string;
  address?: string;
  mnemonic?: string;
  contract?: string;
};

type Action =
  | {type: 'SetIndex'; index: number}
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetMnemonic'; mnemonic?: string}
  | {type: 'SetContract'; contract?: string};

const initialState = {
  index: 0,
  network: 'supernova-2',
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetIndex':
      return {...state, index: action.index};
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    case 'SetMnemonic':
      return {...state, mnemonic: action.mnemonic};
    case 'SetContract':
      return {...state, contract: action.contract};
    default:
      return state;
  }
}

const SecretContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export {SecretContext, initialState, appStateReducer};
