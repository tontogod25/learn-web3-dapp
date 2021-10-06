import React from 'react';
import {Col} from 'antd';
import Image from 'next/image';
import styled from 'styled-components';

import arrow from 'public/arrow.png';

const SetupWizard = () => {
  return (
    <Container>
      <ArrowContainer style={{position: 'absolute', bottom: 0, right: 0}}>
        <Text>
          Once you finished the setup, click here to go to the next step
        </Text>
        <Image src={arrow} alt={''} />
      </ArrowContainer>
    </Container>
  );
};

const Container = styled(Col)`
  position: relative;
  height: 100%;
`;

const Text = styled.div`
  position: absolute;
  bottom: 120px;
  right: 220px;

  width: 200px;
  font-size: 1.4em;
  color: #999;
`;

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default SetupWizard;
