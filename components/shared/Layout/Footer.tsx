import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {trackTutorialStepViewed} from 'utils/tracking-utils';
import {getChainColors} from 'utils/colors';
import {Button, Col, Row} from 'antd';
import styled from 'styled-components';
import {
  useGlobalState,
  getPreviousStepIdForCurrentStepId,
  getCurrentChainId,
  getTitleForCurrentStepId,
  getNextStepIdForCurrentStepId,
  getIsCompletedForCurrentStepId,
  getPreviousStepForCurrentStepId,
  getNextStepForCurrentStepId,
  getIsSkippableForCurrentStepId,
} from 'context';
import React from 'react';
import {FOOTER_HEIGHT} from 'lib/constants';
import {PROTOCOL_STEPS_ID} from 'types';

const Footer = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const isCompleted = getIsSkippableForCurrentStepId(state)
    ? true
    : getIsCompletedForCurrentStepId(state);

  const next = () => {
    const title = getTitleForCurrentStepId(state);
    dispatch({
      type: 'SetChainCurrentStepId',
      chainId: chainId,
      currentStepId: getNextStepIdForCurrentStepId(state) as PROTOCOL_STEPS_ID,
    });
    trackTutorialStepViewed(chainId, title, 'next');
  };

  const prev = () => {
    const title = getTitleForCurrentStepId(state);
    dispatch({
      type: 'SetChainCurrentStepId',
      chainId: chainId,
      currentStepId: getPreviousStepIdForCurrentStepId(
        state,
      ) as PROTOCOL_STEPS_ID,
    });
    trackTutorialStepViewed(chainId, title, 'prev');
  };

  const {primaryColor, secondaryColor} = getChainColors(chainId);
  const previousStep = getPreviousStepForCurrentStepId(state);
  const nextStep = getNextStepForCurrentStepId(state);

  const isFirstStep = previousStep === null ? true : false;
  const isLastStep = nextStep === null ? true : false;

  let justify: 'start' | 'end' | 'space-between';
  if (isFirstStep) {
    justify = 'end';
  } else if (isLastStep) {
    justify = 'start';
  } else {
    justify = 'space-between';
  }

  return (
    <Col span={24}>
      <StepFooter justify={justify} align="middle">
        {previousStep && (
          <PrevButton
            size="large"
            style={{marginRight: '8px'}}
            onClick={() => prev()}
            icon={<ArrowLeftOutlined />}
          >
            {`Prev: ${previousStep.title}`}
          </PrevButton>
        )}
        {nextStep && (
          <NextButton
            size="large"
            type="primary"
            onClick={() => next()}
            secondary_color={secondaryColor}
            primary_color={primaryColor}
            disabled={!isCompleted}
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
