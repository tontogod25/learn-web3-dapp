import {Col, Alert, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
  getNetworkForCurrentChain,
} from 'context';
import axios from 'axios';
import Confetti from 'react-confetti';

const {Text} = Typography;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const network = getNetworkForCurrentChain(state);
  const chainId = getCurrentChainId(state);

  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (version) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [version, setVersion]);

  const getConnection = async () => {
    setFetching(true);
    setError(null);
    setVersion(null);
    try {
      const response = await axios.post(`/api/solana/connect`, {network});
      setVersion(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      {version && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={getConnection}
            loading={fetching}
            size="large"
          />
          {version ? (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>error: {error}</Text>
                </Space>
              }
              type="error"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
