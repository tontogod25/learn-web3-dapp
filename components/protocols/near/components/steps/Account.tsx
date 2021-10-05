import {Alert, Button, Col, Space, Typography, Input} from 'antd';
import {getPublicKey, getAccountUrl} from '@near/lib';
import {useGlobalState} from 'context';
import {useState} from 'react';
import axios from 'axios';

import type {CheckAccountIdT, AlertT} from '@near/types';

const {Text} = Typography;

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

const Account = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [freeAccountId, setFreeAccountId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);
  const {network, accountId} = state;

  const createAccountWithId = async () => {
    const publicKey = state?.secret && getPublicKey(state.secret);
    setIsFetching(true);
    try {
      const response = await axios.post(`/api/near/create-account`, {
        freeAccountId,
        publicKey,
        network,
      });
      dispatch({
        type: 'SetNearAccountId',
        accountId: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const checkAccountIdProps = {
    freeAccountId,
    setFreeAccountId,
    setIsFreeAccountId,
    network,
  };

  return (
    <>
      <Col>
        <Space direction="vertical" size="middle">
          <CheckAccountId {...checkAccountIdProps} />
          <Button
            type="primary"
            onClick={createAccountWithId}
            style={{marginBottom: '20px'}}
            loading={isFetching}
            disabled={!isFreeAccountId}
          >
            Create Account
          </Button>
          {accountId && (
            <Col>
              <Space direction="vertical">
                <Alert
                  message={
                    <Space>
                      <Text strong>Account generated!</Text>
                    </Space>
                  }
                  description={
                    <a
                      href={getAccountUrl(accountId ?? '')}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on NEAR Explorer
                    </a>
                  }
                  type="success"
                  showIcon
                />
              </Space>
            </Col>
          )}
        </Space>
      </Col>
    </>
  );
};

const CheckAccountId: React.FC<CheckAccountIdT> = ({
  network,
  freeAccountId,
  setFreeAccountId,
  setIsFreeAccountId,
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>(
    'Enter an account name including the .testnet suffix -> "example.testnet"',
  );
  const [alertStatus, setAlertStatus] = useState<AlertT>('info');

  const checkAvailabilityOfAccountId = async () => {
    setIsFetching(true);
    try {
      const response = await axios.post(`/api/near/check-account`, {
        freeAccountId,
        network,
      });
      if (response.data) {
        setIsFreeAccountId(response.data);
        setAlertStatus('success');
        setAlertMsg(`Account ${freeAccountId} is available`);
      } else {
        setIsFreeAccountId(response.data);
        setAlertStatus('error');
        setAlertMsg(`Account ${freeAccountId} is not available`);
      }
    } catch (error) {
      console.error(error);
      setAlertStatus('error');
      setAlertMsg(`NEAR connection failed`);
      setIsFreeAccountId(true);
    } finally {
      setIsFetching(false);
    }
  };

  const onInputChange = (e: any) => {
    setAlertStatus('info');
    setAlertMsg(
      'Enter an account name including the .testnet suffix -> "example.testnet"',
    );
    setIsFreeAccountId(false);
    setFreeAccountId(e.target.value);
  };

  const validAccountId: boolean = !(freeAccountId.slice(-8) === '.testnet');

  return (
    <Space direction="vertical" size="small">
      <Text style={{fontWeight: 'bold', fontSize: 20}}>
        Choose an account identifier:
      </Text>
      <Space direction="horizontal" size="small">
        <Input
          placeholder="choose-your-account-name.testnet"
          onChange={onInputChange}
          style={{width: '500px'}}
        />
        <Button
          type="primary"
          onClick={checkAvailabilityOfAccountId}
          loading={isFetching}
          disabled={validAccountId}
        >
          Check it!
        </Button>
      </Space>
      <Notify msg={alertMsg} status={alertStatus} />
    </Space>
  );
};

export default Account;
