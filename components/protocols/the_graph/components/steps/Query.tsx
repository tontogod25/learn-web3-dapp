import React, {useEffect, useState} from 'react';
import {Alert, Col, Space, Typography} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
} from '@apollo/client';
import TEN_MOST_EXPENSIVE_PUNKS from '@the-graph/graphql';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {useColors} from 'hooks';
import {StepButton} from 'components/shared/Button.styles';
import Punks from '@the-graph/components/punks';

const {Text} = Typography;

const GRAPHQL_ENDPOINTS = process.env.NEXT_PUBLIC_PUNK_DATA_CONTRACT_ADDRESS;

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINTS,
  cache: new InMemoryCache(),
});

const QueryPunks = () => {
  const {state, dispatch} = useGlobalState();
  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));
  const [getAssignedPunk, {loading, error, data}] = useLazyQuery(
    TEN_MOST_EXPENSIVE_PUNKS,
  );

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [data]);

  return (
    <Col key={`${loading}`}>
      <Space direction="vertical" size="large">
        <StepButton
          onClick={() => getAssignedPunk()}
          icon={<PoweroffOutlined />}
          type="primary"
          loading={loading}
          secondary_color={secondaryColor}
          primary_color={primaryColor}
          size="large"
          autoFocus={false}
        >
          Get Ten most expensive punks?
        </StepButton>
        {data ? (
          <Punks data={data.punks} />
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
    </Col>
  );
};

const Query = () => {
  if (!GRAPHQL_ENDPOINTS) {
    return <Alert message="Please setup your env" type="error" showIcon />;
  }

  return (
    <ApolloProvider client={client}>
      <QueryPunks />
    </ApolloProvider>
  );
};

export default Query;
