import {Alert, Col, Button, Space, Typography} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  getCurrentStepIdForCurrentChain,
  useGlobalState,
  getCurrentChainId,
} from 'context';
import {getNearState} from '@figment-near/lib';

const {Text} = Typography;

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const nearState = getNearState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (value) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [value, setValue]);

  const getGreeting = async () => {
    setError(null);
    setValue(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/near/getter`, nearState);
      setValue(response.data);
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Get the stored message:</Text>
          <Button type="primary" onClick={getGreeting} loading={fetching}>
            Get Message
          </Button>
        </Space>
        {error && (
          <Alert
            type="error"
            closable
            message={error}
            onClose={() => setError(null)}
          />
        )}
        {value && (
          <Alert
            message={
              <Text strong>
                This is the stored message: <Text code>{value}</Text>
              </Text>
            }
            type="success"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
