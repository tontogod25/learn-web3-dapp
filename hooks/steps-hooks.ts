import { useState } from "react";

import { StepType } from "types/types";

export const useSteps = (steps: StepType[]): {
  next(): void
  prev(): void
  stepIndex: number
  step: StepType
  isFirstStep: boolean
  isLastStep: boolean
} => {
  const [stepIndex, setStepIndex] = useState(0);

  const next = () => setStepIndex(stepIndex + 1);
  const prev = () => setStepIndex(stepIndex - 1);

  const step = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return {
    next,
    prev,
    stepIndex,
    step,
    isFirstStep,
    isLastStep
  }
}