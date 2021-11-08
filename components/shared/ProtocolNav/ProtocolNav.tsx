import ProtocolNavContainer from './ProtocolNav.styles';
import {Typography, Tag, Space, Divider, Menu, Dropdown, message} from 'antd';
import {FundViewOutlined, DownOutlined, ApiOutlined} from '@ant-design/icons';
import {slicedAddress} from 'utils/string-utils';
import {getChainId, isConnectionStep} from 'utils/context';
import {useGlobalState} from 'context';
import {NETWORK, NETWORKS} from 'types';
import {networksMap} from 'utils/networks';
import React from 'react';

const {Paragraph} = Typography;

type ProtocolNavPropsT = {
  address: string;
  network: NETWORKS;
  accountExplorer(address: string): string;
};

const ProtocolNav = (props: ProtocolNavPropsT) => {
  const {state, dispatch} = useGlobalState();
  const chainId = getChainId(state);
  const {address, network, accountExplorer} = props;

  const datahub = networksMap(NETWORK.DATAHUB, chainId);
  const testnet = networksMap(NETWORK.TESTNET, chainId);
  const localnet = networksMap(NETWORK.LOCALNET, chainId);

  const onClick = ({key}: {key: string}) => {
    dispatch({
      type: 'SetSharedState',
      values: [
        {
          network: key,
        },
      ],
    });
    message.info(`Network ${key} selected!`);
  };

  const providerMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key={datahub} disabled={!datahub}>
        {datahub}
      </Menu.Item>
      <Menu.Item key={testnet} disabled={!testnet}>
        {testnet}
      </Menu.Item>
      <Menu.Item key={localnet} disabled={!localnet}>
        {localnet}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ProtocolNavContainer>
        <Space direction="horizontal">
          <Paragraph>
            <Tag color="gold">
              <Space>
                <ApiOutlined />
                <div>
                  <strong>{network}</strong>
                </div>
              </Space>
            </Tag>
          </Paragraph>
          {address && (
            <Paragraph copyable={{text: address, tooltips: `Click to copy!`}}>
              <a
                href={accountExplorer(address)}
                target="_blank"
                rel="noreferrer"
              >
                <Tag color="gold">
                  <Space>
                    <FundViewOutlined />
                    <div>
                      <strong>{slicedAddress(address)}</strong>
                    </div>
                  </Space>
                </Tag>
              </a>
            </Paragraph>
          )}
        </Space>
        <Paragraph>
          <Tag color="geekblue">
            <Space>
              <Dropdown
                overlay={providerMenu}
                disabled={!isConnectionStep(state)}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Network <DownOutlined />
                </a>
              </Dropdown>
            </Space>
          </Tag>
        </Paragraph>
      </ProtocolNavContainer>
      <Divider style={{marginTop: 5, marginBottom: 25}} />
    </>
  );
};

export default ProtocolNav;
