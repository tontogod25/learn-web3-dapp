import {createContext, Dispatch, useContext} from 'react';

export type State = {
  network: string;
  validator(n: number): void;
  address?: string;
  secret?: string;
  programId?: string;
  greeter?: string;
};
type Action =
  | {type: 'SetIndex'; index: number}
  | {type: 'SetValidate'; validate: number}
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetSecret'; secret?: string}
  | {type: 'SetProgramId'; programId?: string}
  | {type: 'SetGreeter'; greeter?: string}
  | {type: 'SetValidator'; validator(n: number): void};

const initialState = {
  network: 'datahub',
  validator: () => {},
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetSecret':
      return {...state, secret: action.secret};
    case 'SetAddress':
      return {...state, address: action.address};
    case 'SetProgramId':
      return {...state, programId: action.programId};
    case 'SetGreeter':
      return {...state, greeter: action.greeter};
    case 'SetValidator':
      return {...state, validator: action.validator};
    default:
      return state;
  }
}

const SolanaContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useAppState = () => useContext(SolanaContext);

export {SolanaContext, initialState, appStateReducer, useAppState};
