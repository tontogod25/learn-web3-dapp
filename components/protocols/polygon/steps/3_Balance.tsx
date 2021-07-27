/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Button, Col, Tag, Space, Typography } from 'antd';
import { ethers } from 'ethers';

import { getPolygonAddressExplorerURL } from 'utils/polygon-utils'
import { PolygonAccountT } from 'types/polygon-types'

const { Text } = Typography;
const EMPTY_BALANCE_STR = "0.0"

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Balance = ({ account }: { account: PolygonAccountT }) => {
  const [balance, setBalance] = useState<string>("");

  const checkBalance = async () => {
    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const blocknumber = await provider.getBlockNumber();
     
      const selectedAddress = window.ethereum.selectedAddress;
      const selectedAddressBalance = await provider.getBalance(selectedAddress);
      const balanceToDisplay = ethers.utils.formatEther(selectedAddressBalance.toString());
  
      if (balanceToDisplay != EMPTY_BALANCE_STR) {
        setBalance(balanceToDisplay);
      }
    }
  }

  const explorerUrl = getPolygonAddressExplorerURL(account as string)

  return (
    <Col style={{ width: "100%" }}>
      <Space direction="vertical"  style={{ width: "100%" }}>
        <Button type="primary" onClick={checkBalance}>Check Balance</Button>
        {balance
          ? <Alert
              message={
                <Text strong>{`This address has a balance of ${balance} MATIC`}</Text>
              }
              description={
                <a href={explorerUrl} target="_blank" rel="noreferrer">View the address on Polyscan</a>
              }
              type="success"
              showIcon
            />
          : <Alert message="No balance to display" type="error" showIcon />
        }
      </Space>
    </Col>
  );
}

export default Balance
