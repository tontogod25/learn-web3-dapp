/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Col, Space} from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import {useEffect} from 'react';
import {useGlobalState} from 'context';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const PUNK_QUERY = gql`
  query {
    transfers(first: 1) {
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

  useEffect(() => {
    if (globalState.valid < 2) {
      globalDispatch({
        type: 'SetValid',
        valid: 2,
      });
    }
  }, []);

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
query {
  transfers(first: 1) {
    id
    from
    to
    value
  }
}

{
  "data": {
    "transfers": [
      {
        "from": "0x5e1d178fd65534060c61283b1abfe070e87513fd",
        "id": "0x00033b41d12eea4dbc827d8e587018aaf315095a4e555abcb1bb4f9e573797c6-59",
        "to": "0xc585d35fb8c9d136d6443a30fd88ccbb5f4cb86d",
        "value": "1"
      }
    ]
  }
}
*/
