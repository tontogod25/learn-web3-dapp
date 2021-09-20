import {
  trackTutorialStepViewed,
  trackStorageCleared,
} from '@funnel/tracking-utils';
import {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {StepType, HooksState} from 'types';

const useLocalStorage = <StateT>(key: string, initialValue: StateT) => {
  const [storedValue, setStoredValue] = useState<StateT>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: StateT | ((val: StateT) => StateT)) => {
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

const initialHookState = {
  stepIndex: 0,
  validIndex: 0,
};

const useSteps = (
  steps: StepType[],
  hooksState: HooksState,
): {
  next(): void;
  prev(): void;
  stepIndex: number;
  validIndex: number;
  step: StepType;
  validate: (n: number) => void;
  clear(chain: string): void;
} => {
  const router = useRouter();
  const {query: {chain} = {}} = router;
  const [stepIndex, setStepIndex] = useState(hooksState?.stepIndex ?? 0);
  const [validIndex, setValidIndex] = useState(hooksState?.validIndex ?? 0);

  const next = useCallback(() => {
    const index = stepIndex + 1;
    trackTutorialStepViewed(chain as string, steps[index].title, 'next');
    setStepIndex(index);
  }, [chain, steps, stepIndex]);

  const prev = useCallback(() => {
    const index = stepIndex - 1;
    trackTutorialStepViewed(chain as string, steps[index].title, 'prev');
    setStepIndex(index);
  }, [chain, steps, stepIndex]);

  const clear = useCallback(
    (chain: string) => {
      trackStorageCleared(chain);
      setValidIndex(0);
      setStepIndex(0);
    },
    [validIndex, stepIndex],
  );

  const validate = useCallback(
    (n: number) => {
      if (n == 0) {
        setValidIndex(n);
      } else if (n >= validIndex) {
        setValidIndex(n);
      }
    },
    [validIndex, setValidIndex],
  );

  const step = steps[stepIndex];

  return {
    next,
    prev,
    stepIndex,
    validIndex,
    step,
    validate,
    clear,
  };
};

export {useLocalStorage, useSteps, initialHookState};
