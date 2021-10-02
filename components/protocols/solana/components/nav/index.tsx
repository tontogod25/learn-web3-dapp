import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT, ErrorT} from '@solana/types';
import ReactJson from 'react-json-view';
import {useGlobalState} from 'context';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {resetStepsStatus} from 'utils';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const {address, programId, secret, greeter} = globalState.solana;

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
    /*
    dispatch({
      type: 'SetCurrentStepIndex',
      currentStepIndex: 0,
    });
    dispatch({
      type: 'SetHighestCompletedStepIndex',
      highestCompletedStepIndex: 0,
    });
    */
    trackStorageCleared(globalState.chainId as string);
  };

  const clearKeychain = () => {
    const proceed = confirm('Are you sure you want to clear the storage?');
    if (proceed) {
      dispatch({
        type: 'SetSolanaAddress',
        address: undefined,
      });
      dispatch({
        type: 'SetSolanaSecret',
        secret: undefined,
      });
      dispatch({
        type: 'SetSolanaProgramId',
        programId: undefined,
      });
      dispatch({
        type: 'SetSolanaGreeter',
        greeter: undefined,
      });
      clear();
    }
  };

  const toggleLocal = (network: string) => {
    dispatch({
      type: 'SetSolanaNetwork',
      network: network,
    });
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={globalState.solana.network}
        style={{width: 120}}
        onChange={toggleLocal}
        disabled={globalState.currentStepIndex != 0}
      >
        <Option value="datahub">Datahub</Option>
        <Option value="devnet">Devnet</Option>
        <Option value="localnet">Localnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export const ErrorBox = ({error}: {error: ErrorT}) => {
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

export default Nav;
