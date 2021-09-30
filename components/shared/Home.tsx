import React from 'react';
import Link from 'next/link';
import {Col, Row} from 'antd';
import styled from 'styled-components';

import {CHAINS, UserActivity} from 'types';
import {CHAINS_CONFIG} from 'lib/constants';
import {getChainColors} from 'utils/colors';
import {trackEvent} from 'utils/tracking-utils';
import ProtocolLogo from 'components/icons';

const Home = () => {
  return (
    <Container>
      <Title>Figment Learn - All Pathways</Title>
      <>
        <Row>
          <Cell span={8}>col-8</Cell>
          <Cell span={8} offset={8}>
            col-8
          </Cell>
        </Row>
        <Row>
          <Cell span={6} offset={6}>
            col-6 col-offset-6
          </Cell>
          <Cell span={6} offset={6}>
            col-6 col-offset-6
          </Cell>
        </Row>
        <Row>
          <Cell span={24}>Chains</Cell>
        </Row>
      </>
    </Container>
  );
};

const Cell = styled(Col)`
  background: #eee;
  border: solid 1px #555;
`;

const Container = styled.div`
  width: 80%;
  margin: 60px auto 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 40px;
`;

// const ChainRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   column-gap: 20px;
//   row-gap: 20px;
// `;

const ProtocolBox = styled.div<{
  active: boolean;
  primary_color: string;
  secondary_color: string;
}>`
  height: 170px;
  border: solid 1px #eee;
  background-color: #f8f8f8;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({active}) => (active ? 1 : 0.4)};

  ${({active, primary_color, secondary_color}) =>
    active &&
    `
		&:hover {
			border: none;
			color: ${secondary_color};
			background: ${primary_color};
			cursor: pointer;
		}
	`}

  &:hover > svg {
    path {
      fill: ${({secondary_color}) => `${secondary_color}`};
    }
  }
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export default Home;
