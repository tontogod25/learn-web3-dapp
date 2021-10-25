import {Col, Alert, Space, Typography} from 'antd';
import {useEffect} from 'react';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import SetupWizard from 'components/shared/SetupWizard';
import {useIdx} from '@figment-ceramic/context/idx';

const {Text} = Typography;

const Connect = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const {isConnected, currentUserAddress, connect} = useIdx();

  useEffect(() => {
    if (currentUserAddress) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [currentUserAddress]);

  const checkConnection = async () => {
    try {
      await connect();
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical" size="large">
          <>
            {isConnected && currentUserAddress ? (
              <>
                <Alert
                  message={<Text strong>Connected to MetaMask 😍</Text>}
                  description={
                    <Space direction="vertical">
                      <Text>Your Ethereum Address is:</Text>
                      <Text code>{currentUserAddress}</Text>
                    </Space>
                  }
                  type="success"
                  showIcon
                  onClick={checkConnection}
                />
                <SetupWizard />
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
