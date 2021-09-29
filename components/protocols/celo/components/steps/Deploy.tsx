import {useState} from 'react';
import axios from 'axios';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@celo/hooks';
import {transactionUrl} from '@celo/lib';

const {Text} = Typography;

const Deploy = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const {state, dispatch} = useAppState();

  const deployContract = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/celo/deploy`, state)
      .then((res) => {
        const hash = res.data.hash;
        const address = res.data.address;
        console.log(hash);
        setTxHash(hash);
        setFetching(false);
        dispatch({
          type: 'SetContract',
          contract: address,
        });
      })
      .catch((err) => {
        const data = err.response.data;
        setFetching(false);
        setError(data);
      });
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <Button type="primary" onClick={deployContract}>
            Deploy the contract
          </Button>
          <Input
            style={{
              minWidth: '200px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={true}
            defaultValue={'Hello World'}
          />
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : txHash.length !== 0 ? (
          <Alert
            message={<Text strong>{`The contract has been deployed!`}</Text>}
            description={
              <a href={transactionUrl(txHash)} target="_blank" rel="noreferrer">
                View the transaction on Celo Explorer
              </a>
            }
            type="success"
            closable
            showIcon
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Deploy;
