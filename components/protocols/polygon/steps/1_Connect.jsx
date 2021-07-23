import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from "antd";
import { ethers } from 'ethers';

import { getDatahubNodeURL } from "utils/datahub-utils";
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types';

const { Text } = Typography;

const Connect = () => {
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = async () => {
    // Uncomment to use the truffle develop local blockchain with chainID 1337 : 
    // const url = 'http://localhost:9545'

    // Uncomment to use DataHub's RPC or WebSocket endpoints
    const url = getDatahubNodeURL(CHAINS.POLYGON, POLYGON_NETWORKS.TESTNET, POLYGON_PROTOCOLS.WS);
    const rpcProvider = new ethers.providers.JsonRpcProvider(url);

    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
          window.location.reload();
      }
    });

    const signer = provider.getSigner();

    // const network = await provider.detectNetwork();
    // console.log(`Network name: ${network.name}`);

    // const blocknumber = await provider.getBlockNumber();
    // console.log(`Block number: ${blocknumber}`);

    // const account_nonce = await provider.getTransactionCount(window.ethereum.selectedAddress)
    // console.log(`Account nonce: ${account_nonce}`)

    // const gasPrice = await provider.getGasPrice();
    // console.log(`Gas Price: ${gasPrice}`)

    // console.log(`ChainID: ${window.ethereum.chainId}`)

    // const accounts = await provider.listAccounts();
    // console.log(`First Account in Metamask: ${accounts[0]}`)

    const signature = await signer.signMessage('Welcome to the Figment Learn Polygon Pathway! Sign this message in Metamask to continue.')

    if (signer && signature) {
      console.log(`Message signature: ${signature}`)
      setChainId(signer.provider.network.chainId)
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