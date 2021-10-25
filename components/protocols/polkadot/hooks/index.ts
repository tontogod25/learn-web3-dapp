import {useState, useContext} from 'react';
import type {State} from '@figment-polkadot/context';
import {PolkadotContext} from '@figment-polkadot/context';

// TODO
// Delete
const useLocalStorage = (key: string, initialValue: State) => {
  const [storedValue, setStoredValue] = useState<State>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: State | ((val: State) => State)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};

const useAppState = () => useContext(PolkadotContext);

export {useLocalStorage, useAppState};
