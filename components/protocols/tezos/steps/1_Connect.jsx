import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from "antd";

import { getDatahubNodeURL } from "utils/datahub-utils";
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types';

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Tezos
            <Text code>v{version}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Tezos" type="error" showIcon />}
    </Col>
  );
}

export default Connect