import {Col, Alert, Space, Typography, Button, Modal} from 'antd';
import {LinkOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useAppState} from '@ceramic/context';
import {ErrorBox} from '@ceramic/components';
import type {ErrorT} from '@ceramic/types';
import {useGlobalState} from 'context';

const {Text} = Typography;

declare let window: {
  ethereum: {
    enable: () => Promise<string[]>;
  };
};

const Connect = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<ErrorT | null>(null);
  const [providerFound, setProviderFound] = useState<boolean>(false);

  const {dispatch} = useAppState();

  useEffect(() => {
    if (window.ethereum) {
      setProviderFound(true);
    }
  }, []);

  useEffect(() => {
    if (address) {
      if (globalState.valid < 1) {
        globalDispatch({
          type: 'SetValid',
          valid: 1,
        });
      }
    }
  }, [address]);

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
    try {
      const addresses = await window.ethereum.enable();
      const address = addresses[0];

      setAddress(address);

      dispatch({
        type: 'SetAddress',
        address: address,
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical" size="large">
          {providerFound ? (
            <>
              {address && (
                <Button
                  type="ghost"
                  icon={<LinkOutlined />}
                  onClick={getConnection}
                  size="large"
                >
                  Connect
                </Button>
              )}
              {address ? (
                <Alert
                  message={
                    <span>
                      Connected to MetaMask:
                      <Text code>Address {address}</Text>
                    </span>
                  }
                  type="success"
                  showIcon
                  onClick={getConnection}
                />
              ) : (
                <Alert
                  message="Not connected to MetaMask"
                  type="error"
                  showIcon
                />
              )}
            </>
          ) : (
            <Alert
              message="Please install MetaMask extension"
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
