import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select, Tag, Space} from 'antd';
import type {EntryT} from '@solana/types';
import {getChainInnerState, getCurrentChainId, useGlobalState} from 'context';
import {CERAMIC_NETWORKS, PROTOCOL_INNER_STATES_ID} from 'types';
import {FundViewOutlined} from '@ant-design/icons';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Option} = Select;

const {Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);

  const ceramicAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  const DID = getChainInnerState(state, chainId, PROTOCOL_INNER_STATES_ID.DID);

  const displayAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const Address = ({display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value, tooltips: `Click to copy!`}}>
        <Tag color="gold">
          <Space>
            <FundViewOutlined />
            <div>
              <strong>{display(value)}</strong>
            </div>
          </Space>
        </Tag>
      </Paragraph>
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
        innerStateId: PROTOCOL_INNER_STATES_ID.DID,
        value: null,
      });
      dispatch({
        type: 'ClearStepProgression',
        chainId,
      });
      trackStorageCleared(chainId);
    }
  };

  const AppState = () => {
    return (
      <>
        {ceramicAddress && (
          <Address
            msg={'Address: '}
            value={ceramicAddress}
            display={displayAddress}
          />
        )}
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  return (
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={CERAMIC_NETWORKS.TESTNET}
        style={{width: 100, textAlign: 'center'}}
        disabled={true}
        showArrow={false}
      >
        <Option value={CERAMIC_NETWORKS.TESTNET}>Testnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
