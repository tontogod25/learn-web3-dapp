import {createContext, Dispatch, useContext} from 'react';

export type State = {
  address: string;
};

type Action = {type: 'SetAddress'; address: string};

const initialState = {
  // CryptoPunk smart contract address
  address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
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

export {TheGraphContext, initialState, appReducer, useAppState};
