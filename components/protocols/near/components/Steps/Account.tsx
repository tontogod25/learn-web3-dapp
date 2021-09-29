import {useState} from 'react';
import axios from 'axios';
import {Alert, Button, Col, Space, Typography, Input} from 'antd';
import {useAppState} from '@near/hooks';
import {getPublicKey} from '@near/lib';
import {getAccountUrl} from '@near/lib';
import {Notify} from '@near/components/nav';

import type {CheckAccountIdT, AlertT} from '@near/types';

const {Text} = Typography;

const Account = () => {
  const [freeAccountId, setFreeAccountId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);
  const {state, dispatch} = useAppState();
  const {network, accountId} = state;

  const createAccountWithId = () => {
    setIsFetching(true);
    const publicKey = state?.secret && getPublicKey(state.secret);
    axios
      .post(`/api/near/create-account`, {freeAccountId, publicKey, network})
      .then((res) => {
        const accountId = res.data;
        dispatch({
          type: 'SetAccountId',
          accountId,
        });
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setIsFetching(false);
      });
  };

  const checkAccountIdProps = {
    freeAccountId,
    setFreeAccountId,
    setIsFreeAccountId,
    network,
  };

  return (
    <>
      <Col style={{minHeight: '350px', maxWidth: '600px'}}>
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
                      href={getAccountUrl(network)(accountId ?? '')}
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

  const checkAvailabilityOfAccountId = () => {
    setIsFetching(true);
    axios
      .post(`/api/near/check-account`, {freeAccountId, network})
      .then((res) => {
        if (res.data) {
          setIsFreeAccountId(res.data);
          setAlertStatus('success');
          setAlertMsg(`Account ${freeAccountId} is available`);
        } else {
          setIsFreeAccountId(res.data);
          setAlertStatus('error');
          setAlertMsg(`Account ${freeAccountId} is not available`);
        }
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setAlertStatus('error');
        setAlertMsg(`NEAR connection failed`);
        setIsFreeAccountId(true);
        setIsFetching(false);
      });
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
