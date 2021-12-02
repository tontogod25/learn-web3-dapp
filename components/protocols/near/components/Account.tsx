import {Alert, Button, Col, Space, Typography, Input} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';

import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getPublicKey, accountExplorer} from '@figment-near/lib';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';
import type {CheckAccountIdT, AlertT} from 'types';

const {Text} = Typography;

const Account = () => {
  const {state, dispatch} = useGlobalState();
  const {network, secret, accountId: account_id} = getInnerState(state);

  const [freeAccountId, setFreeAccountId] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);

  useEffect(() => {
    if (accountId) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.ACCOUNT_ID]: accountId,
          },
        ],
        isCompleted: true,
      });
    }
  }, [accountId, setAccountId]);

  const createAccountWithId = async () => {
    const publicKey = secret && getPublicKey(secret);
    setIsFetching(true);
    try {
      const response = await axios.post(`/api/near/create-account`, {
        freeAccountId,
        publicKey,
        network,
      });
      setAccountId(response.data);
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
          {account_id && (
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
                      href={accountExplorer(network)(account_id)}
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
      <Alert
        message={
          <Space>
            <Text strong>{alertMsg}</Text>
          </Space>
        }
        type={alertStatus}
        showIcon
      />
    </Space>
  );
};

export default Account;
