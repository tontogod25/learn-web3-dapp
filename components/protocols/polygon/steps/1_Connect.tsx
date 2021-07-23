/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';

import { ChainId } from 'types/polygon-types';

const { Text } = Typography;

declare let window: any; // Prevents "Property 'ethereum' does not exist on type 'Window & typeof globalThis'. ts(2339)" linter warning

const Connect = () => {
  const [chainId, setChainId] = useState<ChainId | number | null>(null);
  const [account, setAccount] = useState(null)

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = async () => {
    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
    } else {
      const web3provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = web3provider.getSigner();
      
      web3provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
      });

      const selectedAddress = window.ethereum.selectedAddress;
      setAccount(selectedAddress)

      const network = await web3provider.detectNetwork();
      console.log(`Network name: ${network.name}`);
  
      const blocknumber = await web3provider.getBlockNumber();
      console.log(`Block number: ${blocknumber}`);
  
      const gasPrice = await web3provider.getGasPrice();
      console.log(`Gas Price (in Gwei): ${ethers.utils.formatUnits(gasPrice, "gwei")}`);

      const account_nonce = await web3provider.getTransactionCount(selectedAddress);
      console.log(`${account} has nonce: ${account_nonce}`);

      const signature = await signer.signMessage('Welcome to the Polygon Pathway! Sign this message in Metamask to continue.');

      if (signature) {
        console.log(`Message signature: ${signature}`);
        setChainId(signer.provider.network.chainId);
      }
    }
  }

  return (
    <Col style={{ width: "100%" }}>
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
    </Col>
  );
}

export default Connect
