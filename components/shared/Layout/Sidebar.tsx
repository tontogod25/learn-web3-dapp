import React from 'react';
import styled, {withTheme} from 'styled-components';
import {Space, Menu, Dropdown, Progress} from 'antd';
import Markdown from 'components/shared/CustomMarkdown';
import {useGlobalState} from 'context';

import {MarkdownForChainIdT} from 'types';
import {
  getStepTitle,
  getSteps,
  getStepIndex,
  getStepId,
  isOneColumnStep,
} from 'utils/context';

const Sidebar = ({markdown}: {markdown: MarkdownForChainIdT}) => {
  const {state} = useGlobalState();
  const currentStepId = getStepId(state);
  const stepTitle = getStepTitle(state);
  const steps = Object.values(getSteps(state)).map((step) => {
    const index = step.position as number;
    const title = step.title as string;
    return {index, title};
  });
  const isStepOneColumn = isOneColumnStep(state);

  const md = markdown[currentStepId];
  const stepIndex = getStepIndex(state);

  const menu = (
    <StyledMenu>
      {steps.map(({index, title}) => {
        return <MenuItem key={index}>{`${index} - ${title}`}</MenuItem>;
      })}
    </StyledMenu>
  );

  return (
    <Container single_column={isStepOneColumn}>
      <StepHeader size="large" align="center">
        <StepTitle>{stepTitle}</StepTitle>
        <Dropdown overlay={menu}>
          <Progress
            type="circle"
            percent={(stepIndex / steps.length) * 100}
            format={() => `${stepIndex}/${steps.length}`}
            width={50}
            trailColor={'white'}
          />
        </Dropdown>
      </StepHeader>

      <Markdown captureMessage={() => {}}>{md}</Markdown>
    </Container>
  );
};

const Container = styled.div<{single_column: boolean}>`
  ${({theme, single_column}) =>
    single_column &&
    theme.media.xl`
    width: 680px;
    margin: 0 auto;
  `}
`;

const StepHeader = styled(Space)`
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  font-size: 34px;
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
