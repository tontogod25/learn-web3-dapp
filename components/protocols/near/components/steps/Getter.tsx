import {Alert, Col, Button, Space, Typography} from 'antd';
import {useGlobalState} from 'context';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Getter = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<number | null>(null);

  const getGreeting = async () => {
    setError(null);
    setGreeting(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/near/getter`, state);
      setGreeting(response.data);
    } catch (error) {
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
        {greeting && (
          <Alert
            message={
              <Text strong>
                This is the stored message: <Text code>{greeting}</Text>
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
