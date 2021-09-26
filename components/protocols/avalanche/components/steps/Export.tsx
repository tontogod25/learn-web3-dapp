import {Col, Button, Alert, Space} from 'antd';
import {useAppState} from '@avalanche/context';
import {transactionUrl} from '@avalanche/lib';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const Export = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);
  const {state} = useAppState();

  useEffect(() => {
    if (hash) {
      if (globalState.valid < 5) {
        globalDispatch({
          type: 'SetValid',
          valid: 5,
        });
      }
    }
  }, [hash, setHash]);

  const exportToken = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/avalanche/export`, state);
      setHash(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical">
        <Button type="primary" onClick={exportToken} loading={fetching}>
          Export 0.05 AVAX
        </Button>
        {hash && (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={
              <a
                href={transactionUrl(hash ?? '')}
                target="_blank"
                rel="noreferrer"
              >
                View transaction on Avalanche Explorer
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

export default Export;
