import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {trackTutorialStepViewed} from 'utils/tracking-utils';
import {getChainColors} from 'utils/colors';
import {Button, Col, Row} from 'antd';
import styled from 'styled-components';
import {useGlobalState} from 'context';
import {CHAINS, StepType} from 'types';
import React from 'react';
import {FOOTER_HEIGHT} from 'lib/constants';
import {getStepsStatus} from 'utils';

const Footer = ({
  step,
  steps,
  chainId,
  prevStep,
  nextStep,
}: {
  step: StepType;
  steps: StepType[];
  chainId: CHAINS;
  prevStep: StepType | null;
  nextStep: StepType | null;
}) => {
  const {state, dispatch} = useGlobalState();
  const next = () => {
    const currentStepIndex = state.currentStepIndex + 1;
    dispatch({
      type: 'SetCurrentStepIndex',
      currentStepIndex,
    });
    trackTutorialStepViewed(
      state.chainId as CHAINS,
      steps[state.currentStepIndex].title,
      'next',
    );
  };

  const prev = () => {
    const currentStepIndex = state.currentStepIndex - 1;
    dispatch({
      type: 'SetCurrentStepIndex',
      currentStepIndex,
    });
    trackTutorialStepViewed(
      state.chainId as CHAINS,
      steps[state.currentStepIndex].title,
      'next',
    );
  };

  const {primaryColor, secondaryColor} = getChainColors(
    state.chainId as CHAINS,
  );
  const justify =
    prevStep && nextStep ? 'space-between' : prevStep ? 'start' : 'end';

  const isDisabled = getStepsStatus(state[chainId]?.stepsStatus, step.id);

  return (
    <Col span={24}>
      <StepFooter justify={justify} align="middle">
        {prevStep && (
          <PrevButton
            size="large"
            style={{marginRight: '8px'}}
            onClick={() => prev()}
            icon={<ArrowLeftOutlined />}
          >
            {`Prev: ${prevStep.title}`}
          </PrevButton>
        )}
        {nextStep && (
          <NextButton
            size="large"
            type="primary"
            onClick={() => next()}
            secondary_color={secondaryColor}
            primary_color={primaryColor}
            disabled={!isDisabled}
          >
            <Row align="middle">
              {`Next: ${nextStep.title}`}
              <ArrowRightOutlined size={20} style={{marginLeft: '6px'}} />
            </Row>
          </NextButton>
        )}
      </StepFooter>
    </Col>
  );
};

const NextButton = styled(Button)<{
  primary_color: string;
  secondary_color: string;
}>`
  border: none;
  color: ${({secondary_color}) => secondary_color};
  background: ${({primary_color}) => primary_color};

  &:hover {
    background: ${({primary_color}) => primary_color};
    color: ${({secondary_color}) => secondary_color};
    border: none;
    box-shadow: black 2px 2px 1px;
  }
`;

const PrevButton = styled(Button)`
  background: white;
  border: solid #777 1px;
  color: #777;

  &:hover {
    color: black;
    border: solid black 1px;
  }
`;

const StepFooter = styled(Row)`
  padding: 0 40px;
  height: ${FOOTER_HEIGHT}px;
  background: #f5f5f5;
  border-top: solid 2px black;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default Footer;
