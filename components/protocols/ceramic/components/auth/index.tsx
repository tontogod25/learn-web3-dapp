import React, {useState} from 'react';
import {
  Button,
  Space,
  Menu,
  Dropdown,
  Tag,
  Popover,
  Typography,
  Divider,
  Form,
  Row,
  Col,
  Avatar,
} from 'antd';
import {
  FundViewOutlined,
  LinkOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {useIdx} from '@ceramic/context/idx';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getCurrentChainId, useGlobalState} from 'context';
import {slicedAddress} from '@funnel/string-utils';
import {EntryT} from '@ceramic/types';
import IdentityItem from '@ceramic/components/auth/IdentityItem';
import IdentityPopover from '@ceramic/components/auth/IdentityPopover';

type AuthProps = {
  onConnected?: (address: string) => void;
  onLoggedIn?: (did: string) => void;
  onLoggedOut?: () => void;
  onlyConnect?: boolean;
  connectText?: string;
  disconnectText?: string;
  logInText?: string;
  logOutText?: string;
};

const Auth = (props: AuthProps): JSX.Element => {
  const {
    onlyConnect = false,
    onConnected,
    onLoggedIn,
    onLoggedOut,
    logInText = 'Log In',
    logOutText = 'Log Out',
    connectText = 'Connect',
    disconnectText = 'Disconnect',
  } = props;
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);

  const {
    connect,
    disconnect,
    logIn,
    logOut,
    isConnected,
    isAuthenticated,
    currentUserAddress,
    currentUserDID,
    currentUserData,
  } = useIdx();
  const [loading, setLoading] = useState<boolean>(false);

  const handleConnect = async () => {
    try {
      setLoading(true);

      const address = await connect();

      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
        value: address,
      });

      if (onConnected) {
        onConnected(address);
      }
    } catch (err) {
      alert('Could not connect to Metamask');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);

      await disconnect();
    } catch (err) {
      alert('Could not disconnect');
    } finally {
      setLoading(false);
    }
  };

  const handleLogIn = async () => {
    try {
      setLoading(true);

      const DID = await logIn();

      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.DID,
        value: DID,
      });

      if (onLoggedIn) {
        onLoggedIn(DID);
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      setLoading(true);

      await logOut();

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
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const UserInfo = ({msg, display, value}: EntryT) => {
    return (
      <Typography.Paragraph
        copyable={{text: value, tooltips: `Click to copy!`}}
      >
        <span>{msg}</span>
        <Tag color="gold">
          <Space>
            <FundViewOutlined />
            <strong>{display ? display(value) : value}</strong>
          </Space>
        </Tag>
      </Typography.Paragraph>
    );
  };

  const IdentityItems = () => {
    return (
      <div>
        <IdentityItem label="Address" value={currentUserAddress} slice />

        <IdentityItem label="DID" value={currentUserDID} slice />

        <IdentityItem
          label="Name"
          value={currentUserData?.basicProfile?.name}
        />
      </div>
    );
  };

  if (onlyConnect) {
    if (isConnected && currentUserAddress) {
      return (
        <IdentityPopover
          actions={[
            <Button
              icon={<LinkOutlined />}
              onClick={handleDisconnect}
              block
              danger
            >
              {disconnectText}
            </Button>,
          ]}
        >
          <Button size="large" shape="round" icon={<UserOutlined />}>
            {slicedAddress(currentUserAddress as string)}
          </Button>
        </IdentityPopover>
      );
    } else {
      return (
        <Button
          type="primary"
          icon={<LinkOutlined />}
          onClick={handleConnect}
          size="large"
          shape="round"
        >
          {connectText}
        </Button>
      );
    }
  }

  if (isAuthenticated && currentUserDID) {
    let displayText;
    if (currentUserData?.basicProfile?.name) {
      displayText = currentUserData.basicProfile.name;
    } else {
      displayText = slicedAddress(
        (currentUserDID || currentUserAddress) as string,
      );
    }

    return (
      <IdentityPopover
        actions={[
          <Button
            icon={<PoweroffOutlined />}
            onClick={handleLogOut}
            block
            danger
          >
            {logOutText}
          </Button>,
        ]}
      >
        <Button size="large" shape="round" icon={<UserOutlined />}>
          {displayText}
        </Button>
      </IdentityPopover>
    );
  } else {
    return (
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={handleLogIn}
          size="large"
          shape="round"
          disabled={loading}
          loading={loading}
        >
          {logInText}
        </Button>
      </Space>
    );
  }
};

export default Auth;
