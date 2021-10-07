import {Col, Alert, Space, Typography, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useEffect} from 'react';
import {
  getChainInnerState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {useIdx} from '@ceramic/context/idx';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const LogIn = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const {logIn, currentUserDID} = useIdx();

  const userAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  const idxDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  useEffect(() => {
    if (currentUserDID) {
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.DID,
        value: currentUserDID,
      });
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [currentUserDID]);

  const handleLogIn = async () => {
    try {
      await logIn(userAddress as string);
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        {!idxDID && (
          <Button
            type="ghost"
            icon={<PoweroffOutlined />}
            onClick={handleLogIn}
            size="large"
          >
            Log In
          </Button>
        )}
        {idxDID ? (
          <Alert
            message={
              <div>
                You are logged in as:
                <Text code>{idxDID}</Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert message="Not logged in" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default LogIn;
