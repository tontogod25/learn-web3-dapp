import {useCallback} from 'react';
import {GlobalStateT} from 'types';
import {trackTutorialStepViewed} from 'utils/tracking-utils';
import {
  getChainId,
  getStepId,
  getStepTitle,
  getPreviousStepId,
  getNextStepId,
  getPreviousStep,
  getNextStep,
  isCompletedStep,
  isFirstStep,
  isLastStep,
} from 'utils/context';
import {Action} from 'context';

const useSteps = (state: GlobalStateT, dispatch: (value: Action) => void) => {
  const chainId = getChainId(state);
  const stepId = getStepId(state);

  const prev = useCallback(() => {
    const title = getStepTitle(state);
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
    const title = getStepTitle(state);
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

  let justify: 'start' | 'end' | 'space-between';
  if (isFirstStep(state)) {
    justify = 'end';
  } else if (isLastStep(state)) {
    justify = 'start';
  } else {
    justify = 'space-between';
  }

  return {
    next,
    prev,
    isFirstStep: isFirstStep(state),
    isLastStep: isLastStep(state),
    justify,
    nextStepTitle: getNextStep(state)?.title,
    previousStepTitle: getPreviousStep(state)?.title,
    isCompleted: isCompletedStep(state),
  };
};

export default useSteps;
