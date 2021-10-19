import {Alert, Col, Button, Space, Typography} from 'antd';
import {useAppState} from '@figment-celo/hooks';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Getter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<number | null>(null);
  const {state} = useAppState();

  const getGreeting = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/celo/getter`, state)
      .then((res) => {
        setGreeting(res.data);
        setFetching(false);
      })
      .catch((err) => {
        const data = err.response.data;
        setFetching(false);
        setGreeting(null);
        setError(data.message);
      });
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Get the stored value:</Text>
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
                This is the stored value: <Text code>{greeting}</Text>
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
