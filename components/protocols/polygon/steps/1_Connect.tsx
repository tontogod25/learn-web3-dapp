/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Button, Col, Space, Typography, Tag } from 'antd';
import { ethers, providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Network } from "@ethersproject/networks";

import { PolygonAccountT } from 'types/polygon-types';

const { Text } = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = ({ account, setAccount }: { account: PolygonAccountT, setAccount(account: PolygonAccountT): void }) => {
  const [network, setNetwork] = useState<Network | null>(null);

  const checkConnection = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      // TODO
      // Connect to Polygon using Web3Provider and Metamask
      // Define address and network
      /*
      const web3provider = undefined
      const address = undefined
      const network = undefined

      setAccount(address)
      setNetwork(network)
      */
    } else {
      alert("Please install Metamask at https://metamask.io")
    }
  }

  return (
    <Col>
      <Space direction="vertical"  style={{ width: "100%" }}>
        {<Button type="primary" onClick={checkConnection}>Check Metamask Connection</Button>}
        {(account && network)
          ? <Alert
              message={
                <Text strong>{`Connected to ${network.name}`}</Text>
              }
              type="success"
              showIcon
            />
          : <Alert message="Not connected to Polygon" type="error" showIcon />}
      </Space>
    </Col>
  );
}

export default Connect
