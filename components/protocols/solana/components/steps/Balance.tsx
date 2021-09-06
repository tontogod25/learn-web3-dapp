import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { useAppState } from '@solana/hooks';
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const DECIMAL_OFFSET = 10**9;

const Balance = () => {
  const [value, setValue] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);(null);
	const { state } = useAppState();

  const getBalance = () => {
    setError(null)
    setFetching(true)
		axios
			.post(`/api/solana/balance`, state)
			.then(res => {
				const data = res.data
				setBalance(data / DECIMAL_OFFSET)
				setFetching(false)
			})
			.catch(err => {
				const data = err.response.data
				setFetching(false)
        setBalance(null)
				setError(data.message)
			})
  }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated previously:</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getBalance} loading={fetching}>Check Balance</Button>
        </Space>
        {error && <Alert type="error" closable message={error} onClose={() => setError(null)} /> }
        {balance && 
          <Alert 
            message={
              <Text strong>{`This address has a balance of ${balance} SOL`}</Text>
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

export default Balance
