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
import Confetti from 'react-confetti';
import {PoweroffOutlined} from '@ant-design/icons';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const {ADDRESS, METAMASK_NETWORK_NAME} = getPolygonInnerState(state);
  const chainId = getCurrentChainId(state);

  const [error, setError] = useState<string | undefined>(undefined);
  const [network, setNetwork] = useState<Network | undefined>(undefined);
  const [address, setAddress] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

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
    setFetching(true);
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
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      {ADDRESS && METAMASK_NETWORK_NAME && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={connect}
            loading={fetching}
            size="large"
          />
          {ADDRESS && METAMASK_NETWORK_NAME ? (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>address: {ADDRESS}</Text>
                </Space>
              }
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>error: {error}</Text>
                </Space>
              }
              type="error"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
// ADDRESS && METAMASK_NETWORK_NAME
