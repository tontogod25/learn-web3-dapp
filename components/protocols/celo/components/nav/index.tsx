import {Typography, Popover, Button} from 'antd';
import {useAppState} from '@figment-celo/hooks';
import type {EntryT} from '@figment-celo/types';
import {trackStorageCleared} from 'utils/tracking-utils';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useAppState();
  const {network, secret, address, contract} = state;

  const displayNetwork = (network: string) => network;
  const displayAddress = (address: string) =>
    `${address.slice(0, 5)}...${address.slice(-5)}`;
  const displaySecret = (secret: string) =>
    `${secret.slice(0, 5)}...${secret.slice(-5)}`;

  const Entry = ({msg, display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value}}>
        <Text strong>{msg}</Text>
        <Text code>{display(value)}</Text>
      </Paragraph>
    );
  };

  const AppState = () => {
    return (
      <>
        {network && (
          <Entry
            msg={'Network version: '}
            value={network}
            display={displayNetwork}
          />
        )}
        {address && (
          <Entry msg={'Address: '} value={address} display={displayAddress} />
        )}
        {secret && (
          <Entry msg={'Secret'} value={secret} display={displaySecret} />
        )}
        {contract && (
          <Entry msg={'Contract: '} value={contract} display={displayAddress} />
        )}
      </>
    );
  };

  const clearStorage = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('celo');
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetContract',
      contract: undefined,
    });
    dispatch({
      type: 'SetSecret',
      secret: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    dispatch({
      type: 'SetNetwork',
      network: 'alfajores',
    });
    trackStorageCleared('celo');
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Storage</Button>
      </Popover>
      <Button danger onClick={clearStorage}>
        Clear Storage
      </Button>
    </StepMenuBar>
  );
};

export default Nav;
