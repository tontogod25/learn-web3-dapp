import {Typography, Popover, Button} from 'antd';
import {trackStorageCleared} from '@funnel/tracking-utils';
import type {EntryT, ErrorT} from '@solana/types';
import {useAppState} from '@solana/hooks';
import ReactJson from 'react-json-view';
import {Select} from 'antd';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
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

  const clearKeychain = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('solana');
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
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    dispatch({
      type: 'SetValidate',
      validate: 0,
    });
    trackStorageCleared('solana');
  };

  const toggleLocal = (node: string) => {
    if (node === 'localhost') {
      dispatch({
        type: 'SetNetwork',
        network: 'localhost',
      });
    } else if (node === 'testnet') {
      dispatch({
        type: 'SetNetwork',
        network: 'testnet',
      });
    } else {
      dispatch({
        type: 'SetNetwork',
        network: 'datahub',
      });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 25,
        right: 60,
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        minWidth: '300px',
        minHeight: '100px',
      }}
    >
      <div>
        <Popover content={AppState} placement="rightBottom">
          <Button type="primary">Keychain</Button>
        </Popover>
      </div>
      <div>
        <Select
          defaultValue={state.network}
          style={{width: 120}}
          onChange={toggleLocal}
          disabled={state.index != 0}
        >
          <Option value="datahub">Datahub</Option>
          <Option value="testnet">Testnet</Option>
          <Option value="localhost">Localhost</Option>
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
      collapseStringsAfterLength={65}
    />
  );
};

export {Nav, ErrorBox};
