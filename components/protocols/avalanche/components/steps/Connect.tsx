import {Alert, Col, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {getAvalancheInnerState} from '@figment-avalanche/lib';

const {Text} = Typography;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const avalancheState = getAvalancheInnerState(state);
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

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
    try {
      const response = await axios.post(
        `/api/avalanche/connect`,
        avalancheState,
      );
      setVersion(response.data);
    } catch (error) {
      setVersion(null);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
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
                  Connected to {getCurrentChainId(state)}:
                  <Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
              onClick={getConnection}
            />
          ) : (
            <Alert
              message={`Not connected to ${getCurrentChainId(state)}`}
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
