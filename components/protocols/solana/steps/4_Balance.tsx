import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { SolanaBalanceResponse, SolanaBalanceErrorResponse } from "types/solana-types"
import { getAccountExplorerURL } from "../utils";
import axios from 'axios';

const { Text } = Typography;

const DECIMAL_OFFSET = 1000000000;

const Balance = () => {
  const [value, setValue] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);(null);

  const getBalance = () => {
    setError(null)
    setFetching(true)
		axios
			.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/balance`,
        {
					address: value,
				},
      )
			.then(res => {
				const data: SolanaBalanceResponse = res.data
				setBalance(data / DECIMAL_OFFSET)
				setFetching(false)
			})
			.catch(err => {
				const data: SolanaBalanceErrorResponse = err.response.data
				setFetching(false)
        setBalance(null)
				setError(data.message)
			})
  }

  const explorerUrl = getAccountExplorerURL(value);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated previously:</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getBalance}>Check Balance</Button>
        </Space>
        {error && <Alert type="error" closable message={error} /> }
        {fetching
				  ? <LoadingOutlined style={{ fontSize: 24 }} spin />
          : balance
            ? <Alert
                message={
                  <Text strong>{`This address has a balance of ◎${balance}`}</Text>
                }
                description={
                  <a href={explorerUrl} target="_blank" rel="noreferrer">View the address on Solana Explorer</a>
                }
                type="success"
                closable
                showIcon
              />
            : null
        }
      </Space>
    </Col>
  );
}

export default Balance