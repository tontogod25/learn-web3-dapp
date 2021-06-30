import { useEffect, useState } from 'react';
import { getNodeRpcURL } from "../utils";
import { Alert, Col, Space, Typography } from "antd";
import { Avalanche } from 'avalanche';

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = new URL(getNodeRpcURL());
    const client = new Avalanche(
      url.hostname,
      url.port,
      url.protocol.replace(":", ""),
      parseInt(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_ID),
      "X",
      "C",
      process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_NAME
    );  

  // Apply DataHub API authentication token
  client.setAuthToken(process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY)


  console.log(process.env)
  console.log(getNodeRpcURL())
  console.log(url)
  const info = client.Info()
  console.log("Fetching network information...")
  info.getNodeVersion()
    .then(res => console.log(res))
    .catch(err => console.log(err));

  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Solana
            <Text code>v{version["solana-core"]}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Avalanche" type="error" showIcon />}
    </Col>
  );
}

export default Connect