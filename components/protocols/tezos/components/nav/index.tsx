import {Typography, Popover, Button} from 'antd';
import {useAppState} from '@tezos/hooks';
import type {EntryT} from '@tezos/types';
import {trackStorageCleared} from '../../../../../utils/tracking-utils';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useAppState();
  const {network, secret, address, mnemonic, contract} = state;

  const displayNetwork = (network: string) => network;
  const displayAddress = (address: string) =>
    `${address.slice(0, 5)}...${address.slice(-5)}`;

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
          <Entry msg={'Network: '} value={network} display={displayNetwork} />
        )}
        {secret && (
          <Entry msg={'Secret: '} value={secret} display={displayAddress} />
        )}
        {address && (
          <Entry msg={'Address: '} value={address} display={displayAddress} />
        )}
        {mnemonic && (
          <Entry msg={'Mnemonic: '} value={mnemonic} display={displayAddress} />
        )}
        {contract && (
          <Entry msg={'Contract: '} value={contract} display={displayAddress} />
        )}
      </>
    );
  };

  const clearStorage = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('tezos');
    dispatch({
      type: 'SetMnemonic',
      mnemonic: undefined,
    });
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetSecret',
      secret: undefined,
    });
    dispatch({
      type: 'SetPassword',
      password: undefined,
    });
    dispatch({
      type: 'SetContract',
      contract: undefined,
    });
    dispatch({
      type: 'SetEmail',
      email: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    trackStorageCleared('tezos');
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
