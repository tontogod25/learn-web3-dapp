import React, {useCallback, useState} from 'react';
import {Alert, Button, Space} from 'antd';
import {LinkOutlined, PoweroffOutlined} from '@ant-design/icons';
import {useIdx} from '@figment-ceramic/context/idx';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getChainInnerState, getCurrentChainId, useGlobalState} from 'context';

type AuthProps = {
  onConnected?: (address: string) => void;
  onLoggedIn?: (did: string) => void;
  onLoggedOut?: () => void;
};

const Auth = (props: AuthProps): JSX.Element => {
  const {onConnected, onLoggedIn, onLoggedOut} = props;
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);

  const {connect, logIn, logOut, isAuthenticated} = useIdx();

  const userDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  const handleLogIn = async () => {
    try {
      const address = await connect();

      if (address) {
        dispatch({
          type: 'SetStepInnerState',
          chainId,
          innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
          value: address,
        });

        if (onConnected) {
          onConnected(address);
        }

        const did = await logIn(address);

        if (did) {
          dispatch({
            type: 'SetStepInnerState',
            chainId,
            innerStateId: PROTOCOL_INNER_STATES_ID.DID,
            value: did,
          });

          if (onLoggedIn) {
            onLoggedIn(did);
          }
        }
      } else {
        alert('Could not connect to Metamask');
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    }
  };

  const handleLogOut = () => {
    logOut();

    dispatch({
      type: 'SetStepInnerState',
      chainId,
      innerStateId: PROTOCOL_INNER_STATES_ID.DID,
      value: null,
    });

    dispatch({
      type: 'SetStepInnerState',
      chainId,
      innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
      value: null,
    });

    dispatch({
      type: 'SetStepInnerState',
      chainId,
      innerStateId: PROTOCOL_INNER_STATES_ID.USER_NAME,
      value: null,
    });

    if (onLoggedOut) {
      onLoggedOut();
    }
  };

  if (userDID && isAuthenticated) {
    return (
      <Space>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={handleLogOut}
          size="large"
          danger
        >
          Log Out
        </Button>
      </Space>
    );
  } else {
    return (
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={handleLogIn}
          size="large"
        >
          Log In
        </Button>
        <Alert
          message="Please log in to submit transactions to Ceramic"
          type="error"
          showIcon
        />
      </Space>
    );
  }
};

export default Auth;
