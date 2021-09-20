import {createContext, Dispatch, useContext} from 'react';

export type State = {
  network?: string;
  address?: string;
};

type Action =
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetValidator'; validator(n: number): void};

const initialState = {};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    default:
      return state;
  }
}

const PolygonContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useAppState = () => useContext(PolygonContext);

export {PolygonContext, initialState, appStateReducer, useAppState};
