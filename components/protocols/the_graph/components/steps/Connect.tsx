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

const PunksOwned = (punks: any) => {
  // @ts-ignore
  return punks?.map(({id}, index: number) => (
    <div key={index}>
      <Text>punks-id: {id}</Text>
    </div>
  ));
};

const Bought = (punks: any) => {
  // @ts-ignore
  return punks?.map(({id}, index: number) => (
    <div key={index}>
      <Text>bought: {id}</Text>
    </div>
  ));
};

const NftsOwned = (nfts: any) => {
  // @ts-ignore
  return nfts?.map(({id}, index: number) => (
    <div key={index}>
      <Text>nfts-id: {id}</Text>
    </div>
  ));
};

const Punk = () => {
  const {loading, error, data} = useQuery(PUNK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.accounts);
  console.log(typeof data.accounts);
  console.log(typeof data.accounts[0].nftsOwned);

  // @ts-ignore
  return data.accounts.map(({id, bought, nftsOwned, punksOwned}) => (
    <div key={id}>
      <Text strong>acount-id: {id}</Text>
      <ul>
        <li>His the Owner of {punksOwned?.length} punks </li>
        <li>Has bought: {bought?.length} punks </li>
      </ul>
    </div>
  ));
};

const Connect = () => {
  console.log(process.env.NEXT_PUBLIC_THE_GRAPH_ITSJERRYOKOLO);
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
