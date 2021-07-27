/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';

import { getPolygonAddressExplorerURL } from 'utils/polygon-utils'
import { PolygonChainIdT, PolygonAccountT } from 'types/polygon-types';
import detectEthereumProvider from '@metamask/detect-provider';

const { Text } = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = ({ setAccount }: { setAccount(account: PolygonAccountT): void }) => {
  const [chainId, setChainId] = useState<PolygonChainIdT | number | null>(null);

  const getConnection = async () => {
    const providerCheck = await detectEthereumProvider();
    if (providerCheck === window.ethereum) {
      console.log(providerCheck)
    }

    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
      return
    }

    await window.ethereum.enable() // Prompts user to unlock Metamask, if it is installed
    const web3provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const signer = web3provider.getSigner();
    
    web3provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });

    const signature = await signer.signMessage('Welcome to the Polygon Pathway! Sign this message in Metamask to continue.');

    if (signature) {
      console.log(`Message signature: ${signature}`);
      setAccount(window.ethereum.selectedAddress)
      setChainId(signer.provider.network.chainId);
    }
  }

  return (
    <Col>
      <Space direction="vertical"  style={{ width: "100%" }}>
        {!chainId && <Button type="primary" onClick={getConnection}>Connect to Polygon (via Metamask)</Button>}
        {chainId
          ? <Alert
          message={
            <Space>
              Connected to Polygon
              <Text code>ChainID: {chainId}</Text>
            </Space>
          }
          type="success"
          showIcon
        /> : <Alert message="Not connected to Polygon" type="error" showIcon />}
      </Space>
    </Col>
  );
}

export default Connect
