import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from "antd";
import Web3 from "web3";

import { getDatahubNodeURL } from "@/utils/datahub-utils";
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from '@/types/types';

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = getDatahubNodeURL(CHAINS.POLYGON, POLYGON_NETWORKS.TESTNET, POLYGON_PROTOCOLS.WS);
    const web3 = new Web3(url);

    if (web3.currentProvider) {
      setVersion(web3.version);
    }
  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Web3
            <Text code>v{version}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Web3" type="error" showIcon />}
    </Col>
  );
}

export default Connect