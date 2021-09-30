import {StepType} from 'types';

/**
 * Returns the number of the step within the array
 * in a human readable way, so it can be used in "step 3 out 10"
 */
export const getStepNumber = ({
  step,
  steps,
}: {
  step: StepType;
  steps: StepType[];
}) => {
  return steps.findIndex((el) => el.id === step.id) + 1;
};
