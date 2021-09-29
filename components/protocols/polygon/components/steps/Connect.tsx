/* eslint-disable react-hooks/exhaustive-deps */
import {useAppState} from '@polygon/context';
import detectEthereumProvider from '@metamask/detect-provider';
import {Alert, Button, Col, Space, Typography} from 'antd';
import {Network} from '@ethersproject/networks';
import {useState, useEffect} from 'react';
import {useGlobalState} from 'context';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [network, setNetwork] = useState<Network | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (address && network) {
      dispatch({
        type: 'SetAddress',
        address: address,
      });
      dispatch({
        type: 'SetNetwork',
        network: network.name,
      });
      if (globalState.valid < 1) {
        globalDispatch({
          type: 'SetValid',
          valid: 1,
        });
      }
    }
  }, [address, network]);

  const connect = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      // TODO
      // Connect to Polygon using Web3Provider and Metamask
      // Define address and network
      const web3provider = undefined;
      const address = undefined;
      const network = undefined;

      setNetwork(network);
      setAddress(address);
    } else {
      alert('Please install Metamask at https://metamask.io');
    }
  };

  return (
    <Col>
      <Space direction="vertical" style={{width: '100%'}}>
        <Button type="primary" onClick={connect}>
          Check Metamask Connection
        </Button>
        {state.address && state.network && (
          <Alert
            message={<Text strong>{`Connected to ${network?.name}`}</Text>}
            type="success"
            showIcon
          />
        )}
        {!network && !state.address && (
          <Alert message="Not connected to Polygon" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Connect;
