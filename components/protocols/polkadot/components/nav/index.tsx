import {Typography, Popover, Button} from 'antd';
import {useAppState} from '@polkadot/hooks';
import type {EntryT} from '@polkadot/types';
import {trackStorageCleared} from 'utils/tracking-utils';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useAppState();
  const {network, address, mnemonic} = state;

  const displayNetwork = (network: string) => network.slice(0, 5);
  const displayPublicKey = (publicKey: string) =>
    `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`;
  const displayMnemonic = (mnemonic: string) =>
    `${mnemonic.slice(0, 5)}...${mnemonic.slice(-5)}`;

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
        {address && (
          <Entry msg={'Address: '} value={address} display={displayPublicKey} />
        )}
        {mnemonic && (
          <Entry
            msg={'mnemonic: '}
            value={mnemonic}
            display={displayMnemonic}
          />
        )}
      </>
    );
  };

  const clearStorage = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('polkadot');
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetMnemonic',
      mnemonic: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    dispatch({
      type: 'SetNetwork',
      network: 'westend',
    });
    trackStorageCleared('polkadot');
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
