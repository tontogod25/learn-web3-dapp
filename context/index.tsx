import {createContext, Dispatch, useContext} from 'react';

export type GlobalState = {
  index: number;
  valid: number;
  chain?: string;
};

type Action =
  | {type: 'SetIndex'; index: number}
  | {type: 'SetValid'; valid: number}
  | {type: 'SetChain'; chain: string | undefined};

const initialGlobalState = {
  index: 0,
  valid: 0,
};

function globalStateReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SetIndex':
      return {...state, index: action.index};
    case 'SetValid':
      return {...state, valid: action.valid};
    case 'SetChain':
      return {...state, chain: action.chain};
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
