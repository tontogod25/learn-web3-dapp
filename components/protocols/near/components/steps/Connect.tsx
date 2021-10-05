import {Alert, Col, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useGlobalState} from 'context';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Connect = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  console.log(state);

  const getConnection = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/near/connect`, state);
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
                  Connected to {globalState.chainId}:
                  <Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
              onClick={getConnection}
            />
          ) : (
            <Alert
              message={`Not connected to ${globalState.chainId}`}
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
