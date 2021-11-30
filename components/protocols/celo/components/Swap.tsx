import {Col, Button, Alert, Space, Typography} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';

import {transactionUrl} from '@figment-celo/lib';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Swap = () => {
  const {state, dispatch} = useGlobalState();
  const {address, secret, network} = getInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState(null);
  const [celo, setCelo] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const exchangeUSD = async () => {
    setFetching(true);
    setHash(null);
    setCelo(null);
    try {
      const response = await axios.post(`/api/celo/swap`, {
        secret,
        address,
        network,
      });
      setHash(response.data.hash);
      setCelo(response.data.celo);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  const attoCeloToCelo = (celo: string) =>
    `${celo.slice(0, 1)}.${celo.slice(1, 3)}`;

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={exchangeUSD} loading={fetching}>
          Swap 1 cUSD
        </Button>
        {hash && celo ? (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={
              <Text strong>
                You changed <Text code>1 cUsd</Text> to{' '}
                <Text code>{attoCeloToCelo(celo)} cCelo</Text>
              </Text>
            }
            description={
              <a href={transactionUrl(hash)} target="_blank" rel="noreferrer">
                View transaction on Explorer
              </a>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Swap;
