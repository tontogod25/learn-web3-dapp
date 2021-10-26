import {Col, Alert, Space, Typography, Button} from 'antd';
import {LinkOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {
  getChainInnerState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import detectEthereumProvider from '@metamask/detect-provider';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import Confetti from 'react-confetti';

const {Text} = Typography;

declare let window: {
  ethereum: {
    enable: () => Promise<string[]>;
  };
};

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const [address, setAddress] = useState<string | undefined>(undefined);

  const userAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  useEffect(() => {
    if (address) {
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
        value: address,
      });
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [address]);
  const checkConnection = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        // Connect to Polygon using Web3Provider and Metamask.
        // Find more information at: https://docs.metamask.io/guide/rpc-api.html.
        // NOTE: Be careful not to use deprecated method!
        // Define address and network
        const addresses = undefined;
        const address = undefined;

        setAddress(address);
      } else {
        alert('Please install Metamask at https://metamask.io');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      {address && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Space direction="vertical" size="large">
          <>
            <Button
              type="primary"
              icon={<LinkOutlined />}
              onClick={checkConnection}
              size="large"
            >
              Check Metamask Connection
            </Button>
            {userAddress ? (
              <>
                <Alert
                  message={<Text strong>Connected to MetaMask 😍</Text>}
                  description={
                    <Space direction="vertical">
                      <Text>Your Ethereum Address is:</Text>
                      <Text code>{userAddress}</Text>
                    </Space>
                  }
                  type="success"
                  showIcon
                  onClick={checkConnection}
                />
              </>
            ) : (
              <Alert
                message="Not connected to MetaMask"
                type="error"
                showIcon
              />
            )}
          </>
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
