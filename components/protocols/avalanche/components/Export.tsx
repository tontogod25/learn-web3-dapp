import {Col, Button, Alert, Space} from 'antd';
import {transactionUrl} from '@figment-avalanche/lib';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const Export = () => {
  const {state, dispatch} = useGlobalState();
  const {secret, network} = getInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const exportToken = async () => {
    setFetching(true);
    setError(null);
    setHash(null);
    try {
      const response = await axios.post(`/api/avalanche/export`, {
        secret,
        network,
      });
      setHash(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Button type="primary" onClick={exportToken} loading={fetching}>
          Export 0.05 AVAX
        </Button>
        {hash ? (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={
              <a href={transactionUrl(hash)} target="_blank" rel="noreferrer">
                View transaction on block Explorer
              </a>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Export;
