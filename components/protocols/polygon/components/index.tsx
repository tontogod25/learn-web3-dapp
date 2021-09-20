import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import {useAppState} from '@polygon/context';
import type {EntryT} from '@polygon/types';
import {trackStorageCleared} from '@funnel/tracking-utils';
import {FundViewOutlined} from '@ant-design/icons';
import {useGlobalState} from 'context';
const {Paragraph} = Typography;

const {Option} = Select;

const Nav = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const {state, dispatch} = useAppState();
  const {address} = state;

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

  const clear = () => {
    globalDispatch({
      type: 'SetIndex',
      index: 0,
    });
    globalDispatch({
      type: 'SetValid',
      valid: 0,
    });
    trackStorageCleared(globalState.chain as string);
  };

  const clearKeychain = () => {
    alert('You are going to clear the storage');
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetNetwork',
      network: 'datahub',
    });
    clear();
  };

  const AppState = () => {
    return (
      <>
        {address && (
          <Address msg={'Address: '} value={address} display={displayAddress} />
        )}
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 25,
        right: 60,
        display: 'flex',
        justifyContent: 'space-evenly',
        minWidth: '300px',
        minHeight: '100px',
      }}
    >
      <div>
        <Popover content={AppState} placement="leftBottom">
          <Button type="primary">Keychain</Button>
        </Popover>
      </div>
      <div>
        <Select
          defaultValue={'datahub'}
          style={{width: 100, textAlign: 'center'}}
          disabled={true} //{state.index != 0}
          showArrow={false}
        >
          <Option value="datahub">Datahub</Option>
          <Option value="testnet">Testnet</Option>
          <Option value="localhost">Localhost</Option>
        </Select>
      </div>
    </div>
  );
};

export {Nav};
