import {useEffect} from 'react';
import {Alert, Button, Col, Space, Typography} from 'antd';
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

const {Text} = Typography;

const GRAPHQL_ENDPOINTS = 'http://localhost:8000/subgraphs/name/punks';

const client = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_THE_GRAPH_PUNKS,
  uri: GRAPHQL_ENDPOINTS,
  cache: new InMemoryCache(),
});

const GET_ASSIGNED_PUNK = gql`
  query {
    accounts(first: 2) {
      id
      numberOfPunksOwned
      LastMvtAt
    }
  }
`;

const Punks = () => {
  const {state, dispatch} = useGlobalState();
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
    <div>
      <Space direction="vertical" size="large">
        <Button
          onClick={() => getAssignedPunk()}
          type="primary"
          loading={loading}
          size="large"
        >
          Get Assigned Punk?
        </Button>
        {data ? (
          // @ts-ignore
          data.accounts.map(({id, LastMvtAt, numberOfPunksOwned}) => (
            <div key={id}>
              <Text strong>acount-id: {id}</Text>
              <ul>
                <li>NumberofPunks {numberOfPunksOwned}</li>
                <li>LastMvt: {LastMvtAt}</li>
              </ul>
            </div>
          ))
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
