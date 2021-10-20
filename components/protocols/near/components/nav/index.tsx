import {
  NEAR_NETWORKS,
  NETWORKS,
  PROTOCOL_INNER_STATES_ID,
  PROTOCOL_STEPS_ID,
} from 'types';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {
  useGlobalState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {Select, Typography, Popover, Button} from 'antd';
import {getPrettyPublicKey} from '@figment-near/lib';
import type {EntryT} from '@figment-near/types';
import {getNearState} from '@figment-near/lib';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const {SECRET, ACCOUNT_ID, NETWORK} = getNearState(state);

  const displaySecret = (secret: string) =>
    `${getPrettyPublicKey(secret).slice(0, 5)}...${getPrettyPublicKey(
      secret,
    ).slice(-5)}`;
  const displayAccountId = (accountId: string) => accountId;

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
        {SECRET && (
          <Entry msg={'Secret: '} value={SECRET} display={displaySecret} />
        )}
        {ACCOUNT_ID && (
          <Entry
            msg={'Account: '}
            value={ACCOUNT_ID}
            display={displayAccountId}
          />
        )}
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  const clearKeychain = () => {
    const proceed = confirm('Are you sure you want to clear the keychain?');
    if (proceed) {
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.ACCOUNT_ID,
        value: null,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.SECRET,
        value: null,
      });
      dispatch({
        type: 'ClearStepProgression',
        chainId,
      });
    }
  };

  const toggleLocal = (network: NETWORKS) => {
    dispatch({
      type: 'SetChainNetwork',
      chainId: chainId,
      network: network,
    });
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={NETWORK}
        style={{width: 100, textAlign: 'center'}}
        onChange={toggleLocal}
        disabled={
          getCurrentStepIdForCurrentChain(state) !==
          PROTOCOL_STEPS_ID.CHAIN_CONNECTION
        }
      >
        <Option value={NEAR_NETWORKS.DATAHUB}>Datahub</Option>
        <Option value={NEAR_NETWORKS.TESTNET}>Testnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
