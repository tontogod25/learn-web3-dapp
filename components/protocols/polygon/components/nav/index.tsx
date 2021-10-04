import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import type {EntryT} from '@polygon/types';
import {trackStorageCleared} from '@funnel/tracking-utils';
import {FundViewOutlined} from '@ant-design/icons';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {getCurrentChainId, useGlobalState, getChainInnerState} from 'context';
import {PROTOCOL_INNER_STATES_ID, POLYGON_NETWORKS} from 'types';

const {Paragraph} = Typography;

const {Option} = Select;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const polygonAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  const displayAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const Address = ({display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value, tooltips: `Click to copy!`}}>
        <a
          href={getPolygonAddressExplorerURL(value)}
          target="_blank"
          rel="noreferrer"
        >
          <Tag color="gold">
            <Space>
              <FundViewOutlined />
              <div>
                <strong>{display(value)}</strong>
              </div>
            </Space>
          </Tag>
        </a>
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
        innerStateId: PROTOCOL_INNER_STATES_ID.METAMASK_NETWORK_NAME,
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
        {polygonAddress && (
          <Address
            msg={'Address: '}
            value={polygonAddress}
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
        defaultValue={POLYGON_NETWORKS.TESTNET}
        style={{width: 100, textAlign: 'center'}}
        disabled={true}
        showArrow={false}
      >
        <Option value={POLYGON_NETWORKS.TESTNET}>Testnet</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
