import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT, ErrorT} from '@solana/types';
import {useAppState} from '@solana/context';
import ReactJson from 'react-json-view';
import {useGlobalState} from 'context';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const {state, dispatch} = useAppState();
  const {address, programId, secret, greeter} = state;

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
        {programId && (
          <Entry msg={'Program: '} value={programId} display={displayAddress} />
        )}
        {greeter && (
          <Entry msg={'Greeter: '} value={greeter} display={displayAddress} />
        )}
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  const clear = () => {
    globalDispatch({
      type: 'SetIndex',
      index: 0,
    });
    globalDispatch({
      type: 'SetValid',
      valid: 0,
    });
    trackStorageCleared(globalState.chain as string);
  };

  const clearKeychain = () => {
    const proceed = confirm('Are you sure you want to clear the storage?');
    if (proceed) {
      dispatch({
        type: 'SetAddress',
        address: undefined,
      });
      dispatch({
        type: 'SetSecret',
        secret: undefined,
      });
      dispatch({
        type: 'SetProgramId',
        programId: undefined,
      });
      dispatch({
        type: 'SetGreeter',
        greeter: undefined,
      });
      clear();
    }
  };

  const toggleLocal = (network: string) => {
    dispatch({
      type: 'SetNetwork',
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
          defaultValue={state.network}
          style={{width: 120}}
          onChange={toggleLocal}
          disabled={globalState.index != 0}
        >
          <Option value="datahub">Datahub</Option>
          <Option value="devnet">Devnet</Option>
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
