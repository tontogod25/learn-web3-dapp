import {Select, Typography, Popover, Button} from 'antd';
import {useGlobalState} from 'context';
import {getPrettyPublicKey} from '@figment-near/lib';
import type {EntryT} from '@figment-near/types';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {trackStorageCleared} from 'utils/tracking-utils';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const {network, secret, accountId, contractId} = globalState.near;

  const displaySecret = (secret: string) =>
    `${getPrettyPublicKey(secret).slice(0, 5)}...${getPrettyPublicKey(
      secret,
    ).slice(-5)}`;
  const displayAccountId = (accountId: string) => accountId;
  const displayContractId = (contractId: string) => contractId;

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
        {secret && (
          <Entry msg={'Secret: '} value={secret} display={displaySecret} />
        )}
        {accountId && (
          <Entry
            msg={'Account: '}
            value={accountId}
            display={displayAccountId}
          />
        )}
        {contractId && (
          <Entry
            msg={'Contract: '}
            value={contractId}
            display={displayContractId}
          />
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
        type: 'SetNearSecret',
        secret: undefined,
      });
      dispatch({
        type: 'SetNearAccountId',
        accountId: undefined,
      });
      dispatch({
        type: 'SetCurrentStepIndex',
        currentStepIndex: 0,
      });
      dispatch({
        type: 'SetNearConractId',
        contractId: undefined,
      });
      clear();
    }
  };

  const toggleLocal = (network: string) => {
    dispatch({
      type: 'SetNearNetwork',
      network: network,
    });
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={globalState.near.network}
        style={{width: 100, textAlign: 'center'}}
        onChange={toggleLocal}
        disabled={globalState.currentStepIndex != 0}
      >
        <Option value="datahub">Datahub</Option>
        <Option value="testnet">Testnet</Option>
        {/* <Option value="localnet">Localnet</Option> */}
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
