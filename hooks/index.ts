import {
  trackTutorialStepViewed,
  trackStorageCleared,
} from '@funnel/tracking-utils';
import {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {StepType} from 'types';

const useLocalStorage = <StateT>(key: string, initialValue: StateT) => {
  const [storedValue, setStoredValue] = useState<StateT>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
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

const useSteps = (
  steps: StepType[],
): {
  next(): void;
  prev(): void;
  stepIndex: number;
  validIndex: number;
  step: StepType;
  validate: (n: number) => void;
  clear(): void;
} => {
  const router = useRouter();
  const {query: {chain} = {}} = router;
  const [stepIndex, setStepIndex] = useState(0);
  const [validIndex, setValidIndex] = useState(0);

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

  const clear = useCallback(() => {
    trackStorageCleared('solana');
    setValidIndex(0);
    setStepIndex(0);
  }, [chain, steps, stepIndex]);

  const validate = (n: number) => {
    if (n == 0) {
      setValidIndex(n);
    } else if (n >= validIndex) {
      setValidIndex(n);
    }
  };

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

export {useLocalStorage, useSteps};
