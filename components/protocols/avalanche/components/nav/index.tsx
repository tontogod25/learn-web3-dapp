import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT} from '@avalanche/types';
import {useGlobalState} from 'context';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const {address, secret} = globalState.avalanche;

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
        {address && (
          <Entry msg={'Address: '} value={address} display={displayAddress} />
        )}
        {secret && (
          <Entry msg={'Secret: '} value={secret} display={displayAddress} />
        )}
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  const clear = () => {
    dispatch({
      type: 'SetCurrentStepIndex',
      currentStepIndex: 0,
    });
    dispatch({
      type: 'SetHighestCompletedStepIndex',
      highestCompletedStepIndex: 0,
    });
    trackStorageCleared(globalState.chainId as string);
  };

  const clearKeychain = () => {
    const proceed = confirm('Are you sure you want to clear the keychain?');
    if (proceed) {
      dispatch({
        type: 'SetAvalancheAddress',
        address: undefined,
      });
      dispatch({
        type: 'SetAvalancheSecret',
        secret: undefined,
      });
      dispatch({
        type: 'SetAvalancheNetwork',
        network: 'datahub',
      });
      clear();
    }
  };

  const toggleLocal = (network: string) => {
    dispatch({
      type: 'SetAvalancheNetwork',
      network: network,
    });
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={globalState.avalanche.network}
        style={{width: 100, textAlign: 'center'}}
        onChange={toggleLocal}
        disabled={globalState.currentStepIndex != 0}
      >
        <Option value="datahub">Datahub</Option>
        <Option value="devnet">Testnet</Option>
        <Option value="localnet">Localnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
