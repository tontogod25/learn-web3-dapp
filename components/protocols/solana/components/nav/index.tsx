import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT, ErrorT} from '@figment-solana/types';
import ReactJson from 'react-json-view';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {
  useGlobalState,
  getNetworkForCurrentChain,
  isConnectionStep,
} from 'context';
import {SOLANA_NETWORKS} from 'types';
import {getSolanaState} from '@figment-solana/lib';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const {address, secret, programId, greeter, network} = getSolanaState(state);
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
    const proceed = confirm('Are you sure you want to clear progress?');
    if (proceed) {
      dispatch({
        type: 'Clear',
      });
    }
  };

  const toggleLocal = (network: SOLANA_NETWORKS) =>
    dispatch({
      type: 'SetNetwork',
      network: network,
    });

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={network}
        style={{width: 120}}
        onChange={toggleLocal}
        disabled={!isConnectionStep(state)}
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
