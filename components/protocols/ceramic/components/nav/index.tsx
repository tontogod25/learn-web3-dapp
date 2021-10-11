import {trackStorageCleared} from 'utils/tracking-utils';
import {Typography, Popover, Button, Select, Tag, Space} from 'antd';
import type {EntryT} from '@ceramic/types';
import {getChainInnerState, getCurrentChainId, useGlobalState} from 'context';
import {CERAMIC_NETWORKS, PROTOCOL_INNER_STATES_ID} from 'types';
import {FundViewOutlined} from '@ant-design/icons';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import {slicedAddress} from 'utils/string-utils';
import styled from 'styled-components';

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

  const didAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  const name = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.USER_NAME,
  );

  const UserInfo = ({display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value, tooltips: `Click to copy!`}}>
        <Tag color="gold">
          <Space>
            <FundViewOutlined />
            <strong>{display ? display(value) : value}</strong>
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
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.USER_NAME,
        value: null,
      });
      dispatch({
        type: 'ClearStepProgression',
        chainId,
      });
      trackStorageCleared(chainId);
    }
  };

  const menu = () => {
    return (
      <>
        {name && <UserInfo msg={'Name: '} value={name} />}
        {didAddress && (
          <UserInfo
            msg={'Address: '}
            value={didAddress}
            display={slicedAddress}
          />
        )}
        {ceramicAddress && (
          <UserInfo
            msg={'Address: '}
            value={ceramicAddress}
            display={slicedAddress}
          />
        )}
        <Select
          defaultValue={CERAMIC_NETWORKS.TESTNET}
          style={{width: 200, textAlign: 'center'}}
          disabled={true}
          showArrow={false}
        >
          <Option value={CERAMIC_NETWORKS.TESTNET}>Ceramic Testnet</Option>
        </Select>
      </>
    );
  };

  return (
    <StepMenuBar>
      {ceramicAddress && (
        <Popover content={menu} placement="bottomLeft">
          {name ? (
            <DisplayAddress color="orange">{name}</DisplayAddress>
          ) : (
            <DisplayAddress color="orange">
              {slicedAddress(didAddress || ceramicAddress, 10, 5)}
            </DisplayAddress>
          )}
        </Popover>
      )}
    </StepMenuBar>
  );
};

const DisplayAddress = styled(Tag)``;

export default Nav;
