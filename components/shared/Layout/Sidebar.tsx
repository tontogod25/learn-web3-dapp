import React from 'react';
import styled, {withTheme} from 'styled-components';
import {Space, Menu, Dropdown, Progress} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import Markdown from 'components/shared/CustomMarkdown';

import {MarkdownForChainIdT} from 'types';
import {
  useGlobalState,
  getTitleForCurrentStepId,
  getStepsForCurrentChain,
  getPositionForCurrentStepId,
  getCurrentStepIdForCurrentChain,
  getIsSkippableForCurrentStepId,
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
  const isStepSkippable = getIsSkippableForCurrentStepId(state);

  const md = markdown[currentStepId];
  const stepIndex = getPositionForCurrentStepId(state);

  const menu = (
    <StyledMenu>
      {steps.map(({index, title}) => {
        return <MenuItem key={index}>{`${index} - ${title}`}</MenuItem>;
      })}
    </StyledMenu>
  );

  return (
    <Container single_column={isStepSkippable}>
      <StepHeader size="large" align="center">
        <StepTitle>{stepTitle}</StepTitle>
        <Dropdown overlay={menu}>
          <DownOutlined size={20} style={{cursor: 'pointer'}} />
        </Dropdown>
        <Progress
          type="circle"
          percent={(stepIndex / steps.length) * 100}
          format={() => `${stepIndex}/${steps.length}`}
          width={50}
          trailColor={'white'}
        />
      </StepHeader>

      <Markdown captureMessage={() => {}}>{md}</Markdown>
    </Container>
  );
};

const Container = styled.div<{single_column: boolean}>`
  ${({theme, single_column}) =>
    single_column &&
    theme.media.xl`
    width: 50%;
    margin: 0 auto;
  `}
`;

const StepHeader = styled(Space)`
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

const StyledMenu = styled(Menu)`
  padding: 10px 0;
`;

const MenuItem = styled.div`
  padding: 4px 12px;
`;

// @ts-ignore
export default withTheme(Sidebar);
