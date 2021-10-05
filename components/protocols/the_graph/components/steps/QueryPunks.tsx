/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Col, Space, Typography} from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const {Text} = Typography;

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_PUNKS,
  cache: new InMemoryCache(),
});

const PUNK_QUERY = gql`
  query {
    accounts(first: 2) {
      id
      numberOfPunksOwned
      LastMvtAt
    }
  }
`;

const Punks = () => {
  const {loading, error, data} = useQuery(PUNK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // @ts-ignore
  return data.accounts.map(({id, LastMvtAt, numberOfPunksOwned}) => (
    <div key={id}>
      <Text strong>acount-id: {id}</Text>
      <ul>
        <li>NumberofPunks {numberOfPunksOwned}</li>
        <li>LastMvt: {LastMvtAt}</li>
      </ul>
    </div>
  ));
};

const QueryPunk = () => {
  if (!process.env.NEXT_PUBLIC_THE_GRAPH_PUNKS) {
    return <Alert message="Please setup your env" type="error" showIcon />;
  }

  return (
    <ApolloProvider client={client}>
      <Col style={{minHeight: '350px', maxWidth: '600px'}}>
        <Space direction="vertical" style={{width: '100%'}}></Space>
        <Punks />
      </Col>
    </ApolloProvider>
  );
};

export default QueryPunk;
