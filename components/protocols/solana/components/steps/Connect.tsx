import {Col, Alert, Space, Typography, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {ErrorBox} from '@solana/components/nav';
import {useEffect, useState} from 'react';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import {
  getCurrentChainId,
  useGlobalState,
  getChainCurrentStepId,
  getChainNetwork,
} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getChainCurrentStepId(state, chainId);
  const network = getChainNetwork(state, chainId);

  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to connect',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const getConnection = async () => {
    setFetching(true);
    setError(null);
    try {
      const response = await axios.post(`/api/solana/connect`, {network});
      setVersion(response.data);
      dispatch({
        type: 'SetChainProgressIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    } catch (error) {
      setError(prettyError(error));
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
                  Connected to Solana:
                  <Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
              onClick={getConnection}
            />
          ) : (
            <Alert message="Not connected to Solana" type="error" showIcon />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
