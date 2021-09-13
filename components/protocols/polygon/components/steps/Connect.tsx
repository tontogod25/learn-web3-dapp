/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Button, Col, Space, Typography} from 'antd';
import detectEthereumProvider from '@metamask/detect-provider';
import {Network} from '@ethersproject/networks';
import {useAppState} from '@polygon/context';
import {useState} from 'react';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = () => {
  const [network, setNetwork] = useState<Network | undefined>(undefined);
  const {state, dispatch} = useAppState();

  const checkConnection = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      // Connect to Polygon using Web3Provider and Metamask
      // @ts-ignore
      await provider.send('eth_requestAccounts', []);
      const web3provider = undefined;
      // Define address and network
      const signer = undefined;
      const address = undefined;
      const network = undefined;

      setNetwork(network);
      if (address) {
        dispatch({
          type: 'SetAddress',
          address: address,
        });
        dispatch({
          type: 'SetValidate',
          validate: 1,
        });
      }
    } else {
      alert('Please install Metamask at https://metamask.io');
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" style={{width: '100%'}}>
        {
          <Button type="primary" onClick={checkConnection}>
            Check Metamask Connection
          </Button>
        }
        {state.address && network ? (
          <Alert
            message={<Text strong>{`Connected to ${network.name}`}</Text>}
            type="success"
            showIcon
          />
        ) : (
          <Alert message="Not connected to Polygon" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Connect;
