import { useState } from "react";
import { Alert, Button, Space, Col, Input, Typography } from 'antd';
import { Connection, PublicKey } from "@solana/web3.js";

const { Text } = Typography;

const Query = () => {
  const [isFunded, setIsFunded] = useState(false);
  const [value, setValue] = useState("");

  const query = () => {
    const url = new URL(getNodeRpcURL());
    const client = new Avalanche(
      url.hostname,
      url.port,
      url.protocol.replace(":", ""),
      parseInt(process.env.REACT_APP_AVALANCHE_NETWORK_ID),
      "X",
      "C",
      process.env.REACT_APP_AVALANCHE_NETWORK_NAME
    );  


    
  }

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated (you can copy it in the top right corner of the page):</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={query}>Fund this address</Button>
        </Space>
        {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" showIcon />}
      </Space>
    </Col>
  );
}

export default Query