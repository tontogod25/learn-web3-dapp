/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Col, Space, Typography} from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import {useEffect} from 'react';
import {useGlobalState} from 'context';

const {Text} = Typography;

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_ITSJERRYOKOLO,
  cache: new InMemoryCache(),
});

const PUNK_QUERY = gql`
  query {
    accounts(first: 2) {
      id
      punksOwned {
        id
      }
      bought {
        id
      }
      nftsOwned {
        id
      }
    }
  }
`;

const Punk = () => {
  const {loading, error, data} = useQuery(PUNK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // @ts-ignore
  return data.accounts.map(({id, bought, punksOwned}) => (
    <div key={id}>
      <Text strong>acount-id: {id}</Text>
      <ul>
        <li>His the Owner of {punksOwned?.length} punks </li>
        <li>Has bought: {bought?.length} punks </li>
      </ul>
    </div>
  ));
};

const FinalPunks = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();

  useEffect(() => {
    if (globalState.valid < 1) {
      globalDispatch({
        type: 'SetValid',
        valid: 1,
      });
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_THE_GRAPH_ITSJERRYOKOLO) {
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

export default FinalPunks;
