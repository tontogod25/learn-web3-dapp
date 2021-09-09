import {Alert, Space, Typography, Popover, Button} from 'antd';
import {useAppState} from '@near/hooks';
import {getPrettyPublicKey} from '@near/lib';
import type {EntryT, AlertT} from '@near/types';
import {trackStorageCleared} from '../../../../utils/tracking-utils';

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useAppState();
  const {network, secret, accountId, contractId} = state;

  const displaySecret = (secret: string) =>
    `${getPrettyPublicKey(secret).slice(0, 5)}...${getPrettyPublicKey(
      secret,
    ).slice(-5)}`;
  const displayNetwork = (network: string) => network;
  const displayAccountId = (accountId: string) => accountId;
  const displayContractId = (contractId: string) => contractId;

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
        {network && (
          <Entry msg={'Network: '} value={network} display={displayNetwork} />
        )}
        {secret && (
          <Entry msg={'Secret: '} value={secret} display={displaySecret} />
        )}
        {accountId && (
          <Entry
            msg={'Account: '}
            value={accountId}
            display={displayAccountId}
          />
        )}
        {contractId && (
          <Entry
            msg={'Contract: '}
            value={contractId}
            display={displayContractId}
          />
        )}
      </>
    );
  };

  const clearStorage = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('near');
    dispatch({
      type: 'SetSecret',
      secret: undefined,
    });
    dispatch({
      type: 'SetAccountId',
      accountId: undefined,
    });
    dispatch({
      type: 'SetContractId',
      contractId: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    trackStorageCleared('near');
  };

  return (
    <>
      <div style={{position: 'fixed', top: 25, right: 60}}>
        <Popover content={AppState} placement="rightBottom">
          <Button type="primary">Storage</Button>
        </Popover>
      </div>
      <div style={{position: 'fixed', top: 25, right: 165}}>
        <Button danger onClick={clearStorage}>
          Clear Storage
        </Button>
      </div>
    </>
  );
};

const Notify = ({msg, status}: {msg: string; status: AlertT}) => (
  <Alert
    message={
      <Space>
        <Text strong>{msg}</Text>
      </Space>
    }
    type={status}
    showIcon
  />
);

export {Nav, Notify};
