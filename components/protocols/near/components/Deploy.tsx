import {useState, useEffect} from 'react';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import axios from 'axios';

import {transactionUrl} from '@figment-near/lib';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const {secret, accountId, network} = getInnerState(state);

  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const deployContract = async () => {
    try {
      setFetching(true);
      setHash(null);
      setError(null);
      const response = await axios.post(`/api/near/deploy`, {
        secret,
        accountId,
        network,
      });
      setHash(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <Button type="primary" onClick={deployContract} loading={fetching}>
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
        {hash ? (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={<Text strong>{`The contract has been deployed!`}</Text>}
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

export default Deploy;
