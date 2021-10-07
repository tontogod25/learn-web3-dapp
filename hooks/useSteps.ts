import {useCallback} from 'react';
import {GlobalStateT, PROTOCOL_STEPS_ID} from 'types';
import {trackTutorialStepViewed} from '../utils/tracking-utils';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  getTitleForCurrentStepId,
  getPreviousStepIdForCurrentStepId,
  getNextStepIdForCurrentStepId,
  getPreviousStepForCurrentStepId,
  getNextStepForCurrentStepId,
  isCompletedForCurrentStepId,
  isFirstStepForCurrentStepId,
  isLastStepForCurrentStepId,
  Action,
} from 'context';

const useSteps = (state: GlobalStateT, dispatch: (value: Action) => void) => {
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

  const isFirstStep = isFirstStepForCurrentStepId(state);
  const isLastStep = isLastStepForCurrentStepId(state);
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

export default useSteps;
