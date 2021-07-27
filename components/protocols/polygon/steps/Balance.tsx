/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Col, Tag, Space, Typography } from 'antd';
import { ethers } from 'ethers';
import { FundViewOutlined } from '@ant-design/icons';

import { getPolygonAddressExplorerURL } from 'utils/polygon-utils'
import { PolygonAccountT } from 'types/polygon-types'


const { Text } = Typography;
const EMPTY_BALANCE_STR = "0.0"

declare let window: any; // Prevents "Property 'ethereum' does not exist on type 'Window & typeof globalThis'. ts(2339)" linter warning

const Balance = ({ account }: { account: PolygonAccountT }) => {
  const [balance, setBalance] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressExplorerUrl, setAddressExplorerUrl] = useState<string>("");

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const blocknumber = await provider.getBlockNumber();
      console.log(`Block number: ${blocknumber}`);
     
      const selectedAddress = window.ethereum.selectedAddress;
      const selectedAddressBalance = await provider.getBalance(selectedAddress);
      const balanceToDisplay = ethers.utils.formatEther(selectedAddressBalance.toString());
  
      if (balanceToDisplay != EMPTY_BALANCE_STR) {
        setBalance(balanceToDisplay);
        console.log(`setBalance: ${balanceToDisplay}`);
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
            <Tag color="purple">{balance}</Tag> MATIC!
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="No balance to display" type="error" showIcon />
      }
    </Col>
  );
}

export default Balance
