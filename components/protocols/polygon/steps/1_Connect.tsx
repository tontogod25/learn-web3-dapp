/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';

import { getPolygonAddressExplorerURL } from 'utils/polygon-utils'
import { getDatahubNodeURL } from 'utils/datahub-utils'
import { PolygonChainIdT, PolygonAccountT } from 'types/polygon-types';
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types'
import detectEthereumProvider from '@metamask/detect-provider';

const { Text } = Typography;

declare let window: any; // Prevents "Property 'ethereum' does not exist on type 'Window & typeof globalThis'. ts(2339)" linter warning

const Connect = ({
  account,
  setAccount
}: {
  account: PolygonAccountT
  setAccount: (account: PolygonAccountT) => void
}) => {
  const [chainId, setChainId] = useState<PolygonChainIdT | number | null>(null);
  const [addressExplorerUrl, setAddressExplorerUrl] = useState<string>(" ");
  const [addressToDisplay, setAddressToDisplay] = useState<string>("")


  useEffect(() => {
    getConnection();
  }, []); 

  const getConnection = async () => {
    const providerCheck = await detectEthereumProvider();

    if (providerCheck === window.ethereum) {
      console.log(providerCheck)
    }

    if (!window.ethereum) {
      alert("Please visit https://metamask.io & install the Metamask wallet extension to continue!")
    } else {

      await window.ethereum.enable() // Prompts user to unlock Metamask, if it is installed
      const web3provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      const signer = web3provider.getSigner();
      
      web3provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
      });

      const selectedAddress = window.ethereum.selectedAddress;
      const addressToDisplay = `${selectedAddress.slice(0,6)}...${selectedAddress.slice(-4)}`;
      const explorerUrl = getPolygonAddressExplorerURL(selectedAddress);

      setAddressToDisplay(addressToDisplay)
      setAccount(addressToDisplay)

      const signature = await signer.signMessage('Welcome to the Polygon Pathway! Sign this message in Metamask to continue.');

      if (signature) {
        console.log(`Message signature: ${signature}`);
        setChainId(signer.provider.network.chainId);
        setAddressExplorerUrl(explorerUrl);
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
