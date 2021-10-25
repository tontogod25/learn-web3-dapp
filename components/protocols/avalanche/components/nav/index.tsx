import {Typography, Popover, Button, Select} from 'antd';
import type {EntryT} from '@figment-avalanche/types';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {getCurrentChainId, useGlobalState} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getAvalancheInnerState} from '@figment-avalanche/lib';
import {trackStorageCleared} from 'utils/tracking-utils';

const {Option} = Select;

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const {address, secret} = getAvalancheInnerState(state);

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

  const clearKeychain = () => {
    const proceed = confirm('Are you sure you want to clear the keychain?');
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
        type: 'ClearStepProgression',
        chainId,
      });
      trackStorageCleared(chainId);
    }
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={'datahub'}
        style={{width: 100, textAlign: 'center'}}
        onChange={() => {}}
        disabled={true}
      >
        <Option value="datahub">Datahub</Option>
        <Option value="testnet">Testnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
