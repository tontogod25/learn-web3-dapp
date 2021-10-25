/* eslint-disable react-hooks/exhaustive-deps */
import detectEthereumProvider from '@metamask/detect-provider';
import {Alert, Button, Col, Space, Typography} from 'antd';
import {Network} from '@ethersproject/networks';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {getPolygonInnerState} from '@figment-polygon/lib';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const {ADDRESS, METAMASK_NETWORK_NAME} = getPolygonInnerState(state);
  const [error, setError] = useState<string | undefined>(undefined);
  const [network, setNetwork] = useState<Network | undefined>(undefined);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (address && network) {
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
        value: address,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.METAMASK_NETWORK_NAME,
        value: network.name,
      });
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [address, network]);

  const connect = async () => {
    setAddress(null);
    setNetwork(undefined);
    setError(undefined);
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        // Connect to Polygon using Web3Provider and Metamask
        // Define address and network
        const web3provider = undefined;
        const signer = undefined;
        const address = null;
        const network = undefined;

        if (!network) {
          throw new Error('Please complete the code');
        }
        setAddress(address);
        setNetwork(network);
      } else {
        alert('Please install Metamask at https://metamask.io');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Col>
      <Space direction="vertical" style={{width: '100%'}}>
        <Button type="primary" onClick={connect}>
          Check Metamask Connection
        </Button>
        {ADDRESS && METAMASK_NETWORK_NAME && (
          <Alert
            message={
              <Text strong>{`Connected to ${METAMASK_NETWORK_NAME}`}</Text>
            }
            type="success"
            showIcon
          />
        )}
        {!METAMASK_NETWORK_NAME && !ADDRESS && (
          <Alert message="Not connected to Polygon" type="error" showIcon />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable={true}
            onClose={() => setError(undefined)}
          />
        )}
      </Space>
    </Col>
  );
};

export default Connect;
