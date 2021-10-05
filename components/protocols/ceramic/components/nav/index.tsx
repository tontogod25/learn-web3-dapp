import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT, ErrorT} from '@solana/types';
import {useAppState} from '@ceramic/context';
import ReactJson from 'react-json-view';
import {useGlobalState} from 'context';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const {state, dispatch} = useAppState();
  const {address, DID} = state;

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
        {DID && <Entry msg={'DID: '} value={DID} display={displayAddress} />}
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
    const proceed = confirm('Are you sure you want to clear the storage?');
    if (proceed) {
      dispatch({
        type: 'SetCeramicAddress',
        address: undefined,
      });
      dispatch({
        type: 'SetCeramicDID',
        DID: undefined,
      });
      clear();
    }
  };

  const toggleLocal = (network: string) => {
    dispatch({
      type: 'SetCeramicNetwork',
      network: network,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 25,
        right: 60,
        display: 'flex',
        justifyContent: 'space-evenly',
        minWidth: '300px',
        minHeight: '100px',
      }}
    >
      <div>
        <Popover content={AppState} placement="leftBottom">
          <Button type="primary">Keychain</Button>
        </Popover>
      </div>
      <div>
        <Select
          defaultValue={state.ceramic.network}
          style={{width: 120}}
          onChange={toggleLocal}
          disabled={globalState.currentStepIndex != 0}
        >
          <Option value="testnet">Testnet</Option>
          <Option value="localnet">Localnet</Option>
        </Select>
      </div>
    </div>
  );
};

const ErrorBox = ({error}: {error: ErrorT}) => {
  return (
    <ReactJson
      src={error}
      collapsed={false}
      name={'error'}
      displayDataTypes={false}
      displayObjectSize={false}
      collapseStringsAfterLength={35}
    />
  );
};

export {Nav, ErrorBox};
