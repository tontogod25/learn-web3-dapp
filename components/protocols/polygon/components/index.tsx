import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import {trackStorageCleared} from '@funnel/tracking-utils';
import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {FundViewOutlined} from '@ant-design/icons';
import {useAppState} from '@polygon/context';
import type {EntryT} from '@polygon/types';

const {Paragraph} = Typography;

const {Option} = Select;

const Nav = ({clear}: {clear(): void}) => {
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

  const clearKeychain = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('polygon');
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    dispatch({
      type: 'SetValidate',
      validate: 0,
    });
    state.validator(0);
    clear();
    trackStorageCleared('polygon');
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
          defaultValue={state.network}
          style={{width: 120}}
          disabled={true} //{state.index != 0}
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
