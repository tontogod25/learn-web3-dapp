/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Col, Tag, Space, Typography } from 'antd';
import { ethers } from 'ethers';

import { FundViewOutlined } from '@ant-design/icons';

const { Text } = Typography;

declare let window: any; // Prevents "Property 'ethereum' does not exist on type 'Window & typeof globalThis'. ts(2339)" linter warning

const Fund = () => {
  const [balance, setBalance] = useState< string | null >(null);
  const [explorerUrl, setExplorerUrl] = useState("")
  const [address, setAddress] = useState< string | null >(null)

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const blocknumber = await provider.getBlockNumber();
      console.log(`Block number: ${blocknumber}`);
   
      const accounts = await provider.listAccounts();
  
      const selectedAddress = window.ethereum.selectedAddress
      const selectedAddressBalance = await provider.getBalance(selectedAddress);
      const balanceToDisplay = ethers.utils.formatEther(selectedAddressBalance.toString())
  
      const addressToDisplay = `${selectedAddress.slice(0,6)}...${selectedAddress.slice(-4)}`;
      setAddress(addressToDisplay)

      const explorerUrl = `https://mumbai.polygonscan.com/address/${selectedAddress}`
      setExplorerUrl(explorerUrl)
  
      if (balanceToDisplay != "0") {
        setBalance(balanceToDisplay)
        console.log(`setBalance: ${balanceToDisplay}`)
      }
    }
  }

  return (
    <Col style={{ width: "100%" }}>
      {balance
        ? <Alert
        message={
          <Space align="center">
            Balance of {address} is
            <Tag color="purple">{balance}</Tag>MATIC!
            <a href={explorerUrl} target="_blank" rel="noreferrer">
              <Tag color="gold">
                <FundViewOutlined />{" "} {/* Literal space character used for icon/text display */}
                View on PolygonScan
              </Tag>
            </a>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="No balance to display" type="error" showIcon />}
    </Col>
  );
}

export default Fund
