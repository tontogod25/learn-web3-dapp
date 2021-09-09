import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@near/lib';
import {useAppState} from '@near/hooks';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Deploy = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const {state} = useAppState();

  const deployContract = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/near/deploy`, state)
      .then((res) => {
        setTxHash(res.data);
        setFetching(false);
      })
      .catch((err) => {
        const data = err.response.data;
        setFetching(false);
        setError(data);
      });
  };

  const txUrl = getTransactionUrl(state.network)(txHash);

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
