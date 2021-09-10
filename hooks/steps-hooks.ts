import {useCallback, useEffect, useState} from 'react';

import {StepType, UserActivity} from 'types';
import {trackEvent, trackTutorialStepViewed} from '../utils/tracking-utils';
import {useRouter} from 'next/router';

export const useSteps = (
  steps: StepType[],
): {
  next(): void;
  prev(): void;
  stepIndex: number;
  step: StepType;
  isFirstStep: boolean;
  isLastStep: boolean;
} => {
  const router = useRouter();
  const {query: {chain} = {}} = router;
  const [stepIndex, setStepIndex] = useState(0);

  const sendStepViewed = useCallback(
    (stepTitle: string, action: 'next' | 'prev') => {
      trackEvent(UserActivity.TUTORIAL_STEP_VIEWED, {
        protocol: chain,
        stepTitle,
        action,
      });
    },
    [chain],
  );

  const next = useCallback(() => {
    const index = stepIndex + 1;
    trackTutorialStepViewed(chain as string, steps[index].title, 'next');
    return setStepIndex(index);
  }, [chain, steps, stepIndex]);

  const prev = useCallback(() => {
    const index = stepIndex - 1;
    trackTutorialStepViewed(chain as string, steps[index].title, 'prev');
    return setStepIndex(index);
  }, [chain, steps, stepIndex]);

  const step = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return {
    next,
    prev,
    stepIndex,
    step,
    isFirstStep,
    isLastStep,
  };
};
