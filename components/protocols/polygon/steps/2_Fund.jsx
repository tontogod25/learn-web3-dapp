import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from "antd";
import { ethers } from 'ethers';

import { getDatahubNodeURL } from "utils/datahub-utils";
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types';
import { FundViewOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Fund = () => {
  const [balance, setBalance] = useState(null);
  const [explorerUrl, setExplorerUrl] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const blocknumber = await provider.getBlockNumber();
    console.log(`Block number: ${blocknumber}`);
 
    const accounts = await provider.listAccounts();

    const selectedAddressBalance = await provider.getBalance(window.ethereum.selectedAddress);
    const balance = ethers.utils.formatEther(selectedAddressBalance.toString())

    const explorerUrl = `https://mumbai.polygonscan.com/address/${accounts[0]}`
    setExplorerUrl(explorerUrl)

    const address = window.ethereum.selectedAddress
    const addressToDisplay = `${address.slice(0,5)}...${address.slice(-5)}`;
    setAddress(addressToDisplay)

    if (balance > 0) {
      setBalance(balance)
      console.log(balance)
    }
  }

  return (
    <Col style={{ width: "100%" }}>
      {balance
        ? <Alert
        message={
          <Space>
            Balance of {address}:
            <Text code>{balance}</Text> MATIC <br/>
            <a href={explorerUrl} target="_blank" rel="noreferrer">View on PolygonScan</a>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="No balance to display" type="error" showIcon />}
    </Col>
  );
}

export default Fund