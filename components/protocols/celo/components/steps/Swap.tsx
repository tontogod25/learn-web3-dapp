import {useState} from 'react';
import {Col, Button, Alert, Space, Typography} from 'antd';
import {useAppState} from '@celo/hooks';
import {transactionUrl} from '@celo/lib';
import axios from 'axios';

const {Text} = Typography;

const Change = () => {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [celo, setCelo] = useState('');
  const {state} = useAppState();

  const exchangeUSD = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/celo/swap`, state);
      setTxHash(response.data.hash);
      setCelo(response.data.celo);
    } catch (error) {
      try {
        const response = await axios.post(`/api/celo/swap`, state);
        setTxHash(response.data.hash);
        setCelo(response.data.celo);
      } catch (error) {
        console.log(error.message);
      }
    } finally {
      setFetching(false);
    }
  };
  const attoCeloToCelo = (celo: string) =>
    `${celo.slice(0, 1)}.${celo.slice(1, 3)}`;

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical">
        <Button type="primary" onClick={exchangeUSD} loading={fetching}>
          Swap 1 cUSD
        </Button>
        {txHash && (
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
              <a
                href={transactionUrl(txHash ?? '')}
                target="_blank"
                rel="noreferrer"
              >
                View transaction on Celo Explorer
              </a>
            }
          />
        )}
        {error && (
          <Alert
            style={{maxWidth: '350px'}}
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError('')}
          />
        )}
      </Space>
    </Col>
  );
};

export default Change;
