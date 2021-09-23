/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Button, Col, Space, Typography} from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import {useAppState} from '@the-graph/context';
import {useState, useEffect} from 'react';
import {useGlobalState} from 'context';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const PUNK_QUERY = gql`
  query {
    transfers(first: 2) {
      id
      from
      to
      value
    }
  }
`;

const Punk = () => {
  const {loading, error, data} = useQuery(PUNK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // @ts-ignore
  return data.transfers.map(({from, id, to, value}, index) => (
    <div key={index}>
      <ul>
        <li>{from}</li>
        <li>{id}</li>
        <li>{to}</li>
        <li>{value}</li>
      </ul>
    </div>
  ));
};

const Connect = () => {
  console.log(process.env.NEXT_PUBLIC_THE_GRAPH_GRAPHQL_ENDPOINT);
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [queryData, setQueryData] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (globalState.valid < 1) {
      globalDispatch({
        type: 'SetValid',
        valid: 1,
      });
    }
  }, [queryData]);

  if (!process.env.NEXT_PUBLIC_THE_GRAPH_GRAPHQL_ENDPOINT) {
    return <Alert message="Please setup your env" type="error" showIcon />;
  }

  return (
    <ApolloProvider client={client}>
      <Col style={{minHeight: '350px', maxWidth: '600px'}}>
        <Space direction="vertical" style={{width: '100%'}}></Space>
        <Punk />
      </Col>
    </ApolloProvider>
  );
};

export default Connect;

/*
return (
  <ApolloProvider client={client}>
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" style={{width: '100%'}}></Space>
    </Col>
  </ApolloProvider>
);
*/
