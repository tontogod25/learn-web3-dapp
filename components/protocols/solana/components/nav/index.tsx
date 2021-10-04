import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT, ErrorT} from '@solana/types';
import ReactJson from 'react-json-view';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {
  getCurrentChainId,
  useGlobalState,
  getNetworkForCurrentChain,
  isFirstStepForCurrentStepId,
  getFirstStepIdForCurrentChain,
} from 'context';
import {PROTOCOL_INNER_STATES_ID, SOLANA_NETWORKS} from 'types';
import {getSolanaInnerState} from '@solana/lib';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const {address, secret, programId, greeter} = getSolanaInnerState(state);
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
    const proceed = confirm('Are you sure you want to clear the storage?');
    if (proceed) {
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
        value: null,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.SECRET,
        value: null,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.GREETER,
        value: null,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.PROGRAM_ID,
        value: null,
      });
      dispatch({
        type: 'ClearStepProgression',
        chainId,
      });
      dispatch({
        type: 'SetChainCurrentStepId',
        chainId: chainId,
        currentStepId: getFirstStepIdForCurrentChain(state),
      });
      trackStorageCleared(chainId);
    }
  };

  const toggleLocal = (network: SOLANA_NETWORKS) => {
    dispatch({
      type: 'SetChainNetwork',
      chainId,
      network: network,
    });
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={getNetworkForCurrentChain(state) as SOLANA_NETWORKS}
        style={{width: 120}}
        onChange={toggleLocal}
        disabled={!isFirstStepForCurrentStepId(state)}
      >
        <Option value={SOLANA_NETWORKS.DATAHUB}>Datahub</Option>
        <Option value={SOLANA_NETWORKS.DEVNET}>Devnet</Option>
        <Option value={SOLANA_NETWORKS.LOCALNET}>Localnet</Option>
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
