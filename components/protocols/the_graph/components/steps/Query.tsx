import React, {useEffect} from 'react';
import {Alert, Col, Space, Typography} from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql,
} from '@apollo/client';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {StepButton} from 'components/shared/Button.styles';
import {useColors} from 'hooks';
// @ts-ignore
import Identicon from 'react-identicons';
// @ts-ignore
import PunkImage from '@the-graph/components/punkImage';
import {PunkdataT} from '@the-graph/types';
import {toDate, toEther} from '@the-graph/lib';

const {Text} = Typography;

const GRAPHQL_ENDPOINTS = 'http://localhost:8000/subgraphs/name/punks';

const client = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_THE_GRAPH_PUNKS,
  uri: GRAPHQL_ENDPOINTS,
  cache: new InMemoryCache(),
});

const GET_ASSIGNED_PUNK = gql`
  query {
    punks(first: 10, orderBy: lastValue, orderDirection: desc) {
      id
      tokenId
      currentOwner {
        id
      }
      lastValue
      tradeDate
    }
  }
`;

const DisplayPunk = ({punkData}: {punkData: PunkdataT}) => {
  return (
    <>
      <Identicon string={punkData.currentOwner?.id} size={40} />
      <PunkImage index={parseFloat(punkData.tokenId)} />
      <ul>
        <li>Value: {toEther(punkData.lastValue)} ETH</li>
        <li>Date: {toDate(parseFloat(punkData.tradeDate))}</li>
      </ul>
    </>
  );
};

const Punks = () => {
  const {state, dispatch} = useGlobalState();
  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));
  const [getAssignedPunk, {loading, error, data}] =
    useLazyQuery(GET_ASSIGNED_PUNK);

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [data, getAssignedPunk]);

  return (
    <div key={loading as unknown as React.Key}>
      <Space direction="vertical" size="large">
        <StepButton
          onClick={() => getAssignedPunk()}
          type="primary"
          loading={loading}
          secondary_color={secondaryColor}
          primary_color={primaryColor}
          size="large"
          autoFocus={false}
        >
          Get Assigned Punk?
        </StepButton>
        {data ? (
          <div>
            {data.punks.map((punk: PunkdataT) => {
              return <DisplayPunk punkData={punk} key={punk.id} />;
            })}
          </div>
        ) : error ? (
          <Alert
            message={<Text strong>We couldn&apos;t query the subgraph 😢</Text>}
            description={
              <Space direction="vertical">
                <div>Are you sure the subgraph was deployed?</div>
              </Space>
            }
            type="error"
            showIcon
            closable
          />
        ) : null}
      </Space>
    </div>
  );
};

const QueryPunk = () => {
  if (!GRAPHQL_ENDPOINTS) {
    return <Alert message="Please setup your env" type="error" showIcon />;
  }

  return (
    <ApolloProvider client={client}>
      <Col>
        <Space direction="vertical" style={{width: '100%'}}></Space>
        <Punks />
      </Col>
    </ApolloProvider>
  );
};

export default QueryPunk;
