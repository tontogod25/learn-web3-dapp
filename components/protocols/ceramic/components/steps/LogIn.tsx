import {Col, Alert, Space, Typography, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useAppState} from '@ceramic/context';
import {ErrorBox} from '@ceramic/components/nav';
import type {ErrorT} from '@ceramic/types';
import {useGlobalState} from 'context';
import {useIdx} from '@ceramic/context/idx';

const {Text} = Typography;

const LogIn = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const {state, dispatch} = useAppState();
  const [error, setError] = useState<ErrorT | null>(null);

  const {logIn, currentUserDID} = useIdx();

  useEffect(() => {
    if (currentUserDID) {
      if (globalState.valid < 2) {
        globalDispatch({
          type: 'SetValid',
          valid: 2,
        });
      }
    }
  }, [currentUserDID]);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to log in',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const handleLogIn = async () => {
    const didString = await logIn(state.address as string);

    dispatch({
      type: 'SetDID',
      DID: didString,
    });
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        {!currentUserDID && (
          <Button
            type="ghost"
            icon={<PoweroffOutlined />}
            onClick={handleLogIn}
            size="large"
          >
            Log In
          </Button>
        )}
        {currentUserDID ? (
          <Alert
            message={
              <div>
                You are logged in as:
                <Text code>{currentUserDID}</Text>
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
