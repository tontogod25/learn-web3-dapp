import React from 'react';
import styled from 'styled-components';
import {Col, Space, Menu, Dropdown} from 'antd';
import {OrderedListOutlined} from '@ant-design/icons';
import Markdown from '@figment-networks/gitbook-markdown-renderer';

import {GRID_LAYOUT} from 'lib/constants';
import {MarkdownForChainT, StepType} from 'types';

const Sidebar = ({
  steps,
  step,
  markdown,
}: {
  steps: StepType[];
  step: StepType;
  markdown: MarkdownForChainT;
}) => {
  const md = markdown[step.id];

  const menu = (
    <StyledMenu>
      {steps.map((step: StepType, index: number) => {
        return <MenuItem>{`${index + 1} - ${step.title}`}</MenuItem>;
      })}
    </StyledMenu>
  );

  return (
    <Left span={GRID_LAYOUT[0]} key={step.id}>
      <StepHeader size="large" align="center">
        <StepTitle>{step.title}</StepTitle>
        <Dropdown overlay={menu}>
          <OrderedListOutlined style={{fontSize: 20}} />
        </Dropdown>
      </StepHeader>

      <Markdown captureMessage={() => {}}>{md}</Markdown>
    </Left>
  );
};

const Left = styled(Col)`
  position: relative;
  padding: 40px;
  border-right: solid 2px black;
  overflow: scroll;
  height: calc(100vh - 160px);
`;

const StepHeader = styled(Space)`
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyledMenu = styled(Menu)`
  padding: 10px 0;
`;

const MenuItem = styled.div`
  padding: 4px 12px;
`;

export default Sidebar;
