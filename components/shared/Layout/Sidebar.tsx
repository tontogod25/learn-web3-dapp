import React from 'react';
import styled from 'styled-components';
import {Col, Space, Menu, Dropdown} from 'antd';
import {OrderedListOutlined} from '@ant-design/icons';
import Markdown from 'components/shared/CustomMarkdown';

import {FOOTER_HEIGHT, GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import {MarkdownForChainT, CHAINS} from 'types';
import {
  getChainCurrentStepId,
  getChainStepsTitle,
  useGlobalState,
  getChainSteps,
  getCurrentChainId,
  getChainStepsId,
  getChainStepsPosition,
} from 'context';

const Sidebar = ({markdown}: {markdown: MarkdownForChainT}) => {
  const {state} = useGlobalState();
  const chainId = getCurrentChainId(state) as CHAINS;
  const currentStepId = getChainCurrentStepId(state, chainId);
  const stepTitle = getChainStepsTitle(state, chainId, currentStepId);
  const stepId = getChainStepsId(state, chainId, currentStepId);
  const steps = Object.values(getChainSteps(state, chainId)).map((step) => {
    const index = step.position as number;
    const title = step.title as string;
    return {index, title};
  });

  const md = markdown[currentStepId];
  const stepIndex = getChainStepsPosition(state, chainId, currentStepId);

  const menu = (
    <StyledMenu>
      {steps.map(({index, title}) => {
        return <MenuItem key={index}>{`${index + 1} - ${title}`}</MenuItem>;
      })}
    </StyledMenu>
  );

  return (
    <Left span={GRID_LAYOUT[0]} key={stepId}>
      <StepHeader size="large" align="center">
        <StepTitle>{stepTitle}</StepTitle>
        <StepNumber>{`(${stepIndex}/${steps.length})`}</StepNumber>
        <Dropdown overlay={menu}>
          <OrderedListOutlined style={{fontSize: 20}} />
        </Dropdown>
      </StepHeader>

      <Markdown captureMessage={() => {}}>{md}</Markdown>
    </Left>
  );
};

const heightOffset = `${FOOTER_HEIGHT + HEADER_HEIGHT}px`;

const Left = styled(Col)`
  position: relative;
  padding: 40px;
  background: #f5f5f5;
  border-right: solid 2px black;
  overflow: scroll;
  height: calc(100vh - ${heightOffset});
`;

const StepHeader = styled(Space)`
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StepNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #666;
`;

const StyledMenu = styled(Menu)`
  padding: 10px 0;
`;

const MenuItem = styled.div`
  padding: 4px 12px;
`;

export default Sidebar;
