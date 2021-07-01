import { useState, useEffect } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

const DECIMAL_OFFSET = 1000000000;

const Transaction = () => {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(null);
  const [keypair, setKeypair] = useState();

  // useEffect(() => {
  //   getBalance();
  // }, []);


  const getTransaction = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/transaction`)
      .then(res => setBalance(res.data))
  }
          
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated previously:</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getTransaction}>Send Transaction</Button>
        </Space>
        {balance &&
          <Alert
            message={
              <Text strong>{`This address has a balance of ◎${balance}`}</Text>
            }
            description={
              <a href={explorerUrl} target="_blank" rel="noreferrer">View the address on Solana Explorer</a>
            }
            type="success"
            showIcon
          />
        }
      </Space>
    </Col>
  );
}

export default Transaction