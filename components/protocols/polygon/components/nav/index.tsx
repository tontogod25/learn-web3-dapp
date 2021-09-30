import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import type {EntryT} from '@polygon/types';
import {trackStorageCleared} from '@funnel/tracking-utils';
import {FundViewOutlined} from '@ant-design/icons';
import {useGlobalState} from 'context';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Paragraph} = Typography;

const {Option} = Select;

const Nav = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const {address} = globalState.polygon;

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
        type: 'SetPolygonAddress',
        address: undefined,
      });
      dispatch({
        type: 'SetPolygonNetwork',
        network: 'datahub',
      });
      clear();
    }
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
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Keychain</Button>
      </Popover>
      <Select
        defaultValue={'datahub'}
        style={{width: 100, textAlign: 'center'}}
        disabled={true}
        showArrow={false}
      >
        <Option value="datahub">Datahub</Option>
        <Option value="testnet">Testnet</Option>
        <Option value="localhost">Localhost</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
