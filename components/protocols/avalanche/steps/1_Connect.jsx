import { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, Col, Space, Typography } from "antd";

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/connect`)
      .then(res => setVersion(res.data))
  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Avalanche!
            <Text code>{version}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Avalanche" type="error" showIcon />}
    </Col>
  );
}

export default Connect