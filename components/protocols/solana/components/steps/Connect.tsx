import {Col, Alert, Space, Typography, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useAppState} from '@solana/context';
import {ErrorBox} from '@solana/components';
import type {ErrorT, StepT} from '@solana/types';
import {prettyError} from '@solana/lib';
import axios from 'axios';

const {Text} = Typography;

const Connect = ({validate}: StepT) => {
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const {state} = useAppState();

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
      const response = await axios.post(`/api/solana/connect`, state);
      validate(1);
      setVersion(response.data);
    } catch (error) {
      setError(prettyError(error));
      setVersion(null);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button
            type="ghost"
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
