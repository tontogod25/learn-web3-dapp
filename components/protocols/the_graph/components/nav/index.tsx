import {Typography, Popover, Button, Tag, Space, Select} from 'antd';
import type {EntryT} from '@the-graph/types';
import {getEtherScanContract} from '@the-graph/lib';
import {FundViewOutlined} from '@ant-design/icons';
import {useAppState} from '@the-graph/context';
import {getCurrentChainId, useGlobalState} from 'context';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';

const {Paragraph} = Typography;

const {Option} = Select;

const Nav = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const {
    state: {address},
  } = useAppState();

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
      dispatch({
        type: 'ClearStepProgression',
        chainId,
      });
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
    <StepMenuBar>
      <Popover content={AppState} placement="bottom">
        <Button type="ghost">Contract</Button>
      </Popover>
      <Select
        defaultValue={'localhost'}
        style={{width: 100, textAlign: 'center'}}
        disabled={true}
        showArrow={false}
      >
        <Option value="localhost">Local node</Option>
        <Option value="studio">Graph Studio</Option>
      </Select>
    </StepMenuBar>
  );
};

export default Nav;
