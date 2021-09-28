import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import {trackStorageCleared} from 'utils/tracking-utils';
import type {ErrorT, EntryT} from '@the-graph/types';
import {getEtherScanContract} from '@the-graph/lib';
import {FundViewOutlined} from '@ant-design/icons';
import {useAppState} from '@the-graph/context';
import ReactJson from 'react-json-view';
import {useGlobalState} from 'context';

const {Paragraph} = Typography;

const {Option} = Select;

const ErrorBox = ({error}: {error: ErrorT}) => {
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

const Nav = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const {state} = useAppState();
  const {address} = state;

  const displayAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const Address = ({display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value, tooltips: `Click to copy!`}}>
        <a href={getEtherScanContract(value)} target="_blank" rel="noreferrer">
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

  const clearPathway = () => {
    const proceed = confirm('Are you sure you want to reset the pathway?');
    if (proceed) {
      globalDispatch({
        type: 'SetIndex',
        index: 0,
      });
      globalDispatch({
        type: 'SetValid',
        valid: 0,
      });
      trackStorageCleared(globalState.chain as string);
    }
  };

  const AppState = () => {
    return (
      <>
        {address && (
          <Address msg={'Address: '} value={address} display={displayAddress} />
        )}
        <Button danger onClick={clearPathway} size={'small'}>
          Clear Pathway
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
          <Button type="primary">Contract</Button>
        </Popover>
      </div>
      <div>
        <Select
          defaultValue={'localhost'}
          style={{width: 100, textAlign: 'center'}}
          disabled={true} //{state.index != 0}
          showArrow={false}
        >
          <Option value="localhost">Local node</Option>
          <Option value="studio">Graph Studio</Option>
        </Select>
      </div>
    </div>
  );
};

export {Nav, ErrorBox};
