import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {Button, Row, Space} from 'antd';
import styled from 'styled-components';
import React from 'react';

import {CHAINS, StepType} from 'types';
import {getChainColors} from 'utils/colors';

const Footer = ({
  chainId,
  steps,
  stepIndex,
  validIndex,
  next,
  prev,
}: {
  chainId: CHAINS;
  steps: StepType[];
  stepIndex: number;
  validIndex: number;
  next: () => void;
  prev: () => void;
}) => {
  const {primaryColor, secondaryColor} = getChainColors(chainId);
  return (
    <StepFooter size="large">
      <PrevButton
        size="large"
        style={{marginRight: '8px'}}
        onClick={() => prev()}
        icon={<ArrowLeftOutlined />}
        disabled={stepIndex == 0}
      >
        Previous Step
      </PrevButton>
      <NextButton
        size="large"
        type="primary"
        onClick={() => next()}
        secondary_color={secondaryColor}
        primary_color={primaryColor}
        disabled={validIndex == stepIndex || steps.length == stepIndex + 1}
      >
        <Row align="middle">
          Next Step
          <ArrowRightOutlined size={20} style={{marginLeft: '6px'}} />
        </Row>
      </NextButton>
    </StepFooter>
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

const StepFooter = styled(Space)`
  margin: 20px 0 40px 0;
`;

export default Footer;
