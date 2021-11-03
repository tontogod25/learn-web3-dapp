import {useCallback} from 'react';
import {GlobalStateT} from 'types';
import {trackTutorialStepViewed} from '../utils/tracking-utils';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  getTitleForCurrentStepId,
  getPreviousStepId,
  getNextStepId,
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
      type: 'SetSharedState',
      values: [
        {
          currentStepId: getPreviousStepId(state),
        },
      ],
    });
    trackTutorialStepViewed(chainId, title, 'prev');
  }, [chainId, stepId]);

  const next = useCallback(() => {
    const title = getTitleForCurrentStepId(state);
    dispatch({
      type: 'SetSharedState',
      values: [
        {
          currentStepId: getNextStepId(state),
        },
      ],
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
