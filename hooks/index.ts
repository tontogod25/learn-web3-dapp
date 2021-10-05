import {useCallback, useState} from 'react';
import {GlobalStateT, PROTOCOL_STEPS_ID, CHAINS} from 'types';
import {trackTutorialStepViewed} from '../utils/tracking-utils';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  getTitleForCurrentStepId,
  getPreviousStepIdForCurrentStepId,
  getNextStepIdForCurrentStepId,
  getFirstStepIdForCurrentChain,
  getLastStepIdForCurrentChain,
  getPreviousStepForCurrentStepId,
  getNextStepForCurrentStepId,
  isCompletedForCurrentStepId,
  Action,
} from 'context';

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

export const useSteps = (
  state: GlobalStateT,
  dispatch: (value: Action) => void,
) => {
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const prev = useCallback(() => {
    const title = getTitleForCurrentStepId(state);
    dispatch({
      type: 'SetChainCurrentStepId',
      chainId: chainId,
      currentStepId: getPreviousStepIdForCurrentStepId(
        state,
      ) as PROTOCOL_STEPS_ID,
    });
    trackTutorialStepViewed(chainId, title, 'prev');
  }, [chainId, stepId]);

  const next = useCallback(() => {
    const title = getTitleForCurrentStepId(state);
    dispatch({
      type: 'SetChainCurrentStepId',
      chainId: chainId,
      currentStepId: getNextStepIdForCurrentStepId(state) as PROTOCOL_STEPS_ID,
    });
    trackTutorialStepViewed(chainId, title, 'prev');
  }, [chainId, stepId]);

  const isFirstStep = stepId === getFirstStepIdForCurrentChain(state);
  const isLastStep = stepId === getLastStepIdForCurrentChain(state);
  const previousStepTitle = getPreviousStepForCurrentStepId(state)?.title;
  const nextStepTitle = getNextStepForCurrentStepId(state)?.title;
  const isCompleted = isCompletedForCurrentStepId(state);

  let justify: 'start' | 'end' | 'space-between';
  if (isFirstStep) {
    justify = 'end';
  } else if (isLastStep) {
    justify = 'start';
  } else {
    justify = 'space-between';
  }

  return {
    next,
    prev,
    isFirstStep,
    isLastStep,
    justify,
    nextStepTitle,
    previousStepTitle,
    isCompleted,
  };
};

export {useLocalStorage};
