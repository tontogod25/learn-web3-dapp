import {createContext, Dispatch, useContext} from 'react';

export type State = {
  network: string;
  secret?: string;
  address?: string;
};

type Action =
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetSecret'; secret?: string};

const initialState = {
  network: 'datahub',
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetSecret':
      return {...state, secret: action.secret};
    case 'SetAddress':
      return {...state, address: action.address};
    default:
      return state;
  }
}

const AvalancheContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useAppState = () => useContext(AvalancheContext);

export {AvalancheContext, initialState, appStateReducer, useAppState};
