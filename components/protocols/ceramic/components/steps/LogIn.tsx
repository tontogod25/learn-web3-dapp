import {Col, Alert, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {
  getChainInnerState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import Auth from '@figment-ceramic/components/auth';

const {Text} = Typography;

const LogIn = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const [currentUserDID, setCurrentUserDID] = useState<string | undefined>(
    undefined,
  );

  const userDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  useEffect(() => {
    if (currentUserDID) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [currentUserDID]);

  const handleLogIn = async (did: string) => {
    setCurrentUserDID(did);
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Auth onLoggedIn={handleLogIn} />

        {userDID ? (
          <Alert
            message={
              <div>
                Your DID stored in Local Storage is:
                <Text code>{userDID}</Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message="DID not stored in Local Storage. Log in to get one."
            type="error"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default LogIn;
