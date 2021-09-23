import {createContext, Dispatch, useContext} from 'react';

export type State = {
  network: string;
  address?: string;
};

type Action =
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string};

const initialState = {
  network: 'the_graph',
};

function protocolReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    default:
      return state;
  }
}

const TheGraphContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useAppState = () => useContext(TheGraphContext);

export {TheGraphContext, initialState, protocolReducer, useAppState};
