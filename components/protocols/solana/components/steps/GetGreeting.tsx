import { Alert, Col, Button, Space, Typography } from 'antd';
import { useAppState } from '@solana/hooks';
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const GetGreeting = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<number | null>(null);(null);
  const { state } = useAppState();

  const getGreeting = () => {
    setError(null)
    setFetching(true)
		axios
			.post(`/api/solana/getGreetings`, state)
			.then(res => {
				setGreeting(res.data)
				setFetching(false)
			})
			.catch(err => {
				const data = err.response.data
				setFetching(false)
        setGreeting(null)
				setError(data.message)
			})
  }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Get the counter&apos;s value from the program:</Text>
          <Button type="primary" onClick={getGreeting} loading={fetching}>Get Greeting</Button>
        </Space>
        {error && <Alert type="error" closable message={error} onClose={() => setError(null)} /> }
        {greeting && <Alert 
          message={
            <Text strong>{`The account has been greeted ${greeting} times`}</Text>
          }
          type="success"
          closable
          showIcon
        />
        }
      </Space>
    </Col>
  );
}

export default GetGreeting
