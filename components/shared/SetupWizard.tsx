import React from 'react';
import {Col} from 'antd';
import styled from 'styled-components';
import {CornerRightDown} from 'react-feather';

const SetupWizard = ({showText = false}: {showText?: boolean}) => {
  return (
    <Container>
      {showText && (
        <Text>
          Once you finished the setup, click here to go to the next step
        </Text>
      )}
      <CornerRightDown size={100} />
    </Container>
  );
};

const Container = styled(Col)`
  position: fixed;
  bottom: 120px;
  right: 100px;
`;

const Text = styled.div`
  position: fixed;
  bottom: 167px;
  right: 224px;

  width: 200px;
  font-size: 1.4em;
  color: #999;
`;

export default SetupWizard;
