import React from 'react';
import styled from 'styled-components';
import {Col, Space, Menu, Dropdown} from 'antd';
import {OrderedListOutlined} from '@ant-design/icons';
import Markdown from 'components/shared/CustomMarkdown';

import {FOOTER_HEIGHT, GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import {MarkdownForChainIdT} from 'types';
import {
  useGlobalState,
  getTitleForCurrentStepId,
  getStepsForCurrentChain,
  getPositionForCurrentStepId,
  getCurrentStepIdForCurrentChain,
} from 'context';

const Sidebar = ({markdown}: {markdown: MarkdownForChainIdT}) => {
  const {state} = useGlobalState();
  const currentStepId = getCurrentStepIdForCurrentChain(state);
  const stepTitle = getTitleForCurrentStepId(state);
  const steps = Object.values(getStepsForCurrentChain(state)).map((step) => {
    const index = step.position as number;
    const title = step.title as string;
    return {index, title};
  });

  const md = markdown[currentStepId];
  const stepIndex = getPositionForCurrentStepId(state);

  const menu = (
    <StyledMenu>
      {steps.map(({index, title}) => {
        return <MenuItem key={index}>{`${index + 1} - ${title}`}</MenuItem>;
      })}
    </StyledMenu>
  );

  return (
    <Left span={GRID_LAYOUT[0]} key={currentStepId}>
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
