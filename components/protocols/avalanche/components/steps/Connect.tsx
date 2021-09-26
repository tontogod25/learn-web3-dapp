import {Alert, Col, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useAppState} from '@avalanche/context';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Connect = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state} = useAppState();

  useEffect(() => {
    if (version) {
      if (globalState.valid < 1) {
        globalDispatch({
          type: 'SetValid',
          valid: 1,
        });
      }
    }
  }, [version, setVersion]);

  const getConnection = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/solana/connect`, state);
      setVersion(response.data);
    } catch (error) {
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
            <Alert
              message={`Not connected to ${globalState.chain}`}
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
