import {Col, Button, Alert, Space} from 'antd';
import {transactionUrl} from '@figment-avalanche/lib';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {getAvalancheInnerState} from '@figment-avalanche/lib';

const Export = () => {
  const {state, dispatch} = useGlobalState();
  const avalancheState = getAvalancheInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [hash, setHash]);

  const exportToken = async () => {
    setFetching(true);
    try {
      const response = await axios.post(
        `/api/avalanche/export`,
        avalancheState,
      );
      setHash(response.data);
    } catch (error) {
      const errorMsg = error.data ? error.data.message : 'Unknow error';
      setError(errorMsg);
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
        {hash && (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={
              <a
                href={transactionUrl(hash as string)}
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
            message={error}
          />
        )}
      </Space>
    </Col>
  );
};

export default Export;
