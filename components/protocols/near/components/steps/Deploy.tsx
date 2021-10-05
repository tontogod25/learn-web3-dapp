import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@near/lib';
import {useGlobalState} from 'context';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Deploy = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');

  const deployContract = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/near/deploy`, state);
      setTxHash(response.data);
    } catch (error) {
      const data = error.response.data;
      setError(data);
    } finally {
      setFetching(false);
    }
  };

  const txUrl = getTransactionUrl(txHash);

  return (
    <Col>
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
            defaultValue={state.accountId}
          />
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : txHash.length !== 0 ? (
          <Alert
            message={<Text strong>{`The contract has been deployed!`}</Text>}
            description={
              <a href={txUrl} target="_blank" rel="noreferrer">
                View the transaction on NEAR Explorer
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
