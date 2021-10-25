import {Alert, Button, Col, Space, Typography, Input} from 'antd';
import {getPublicKey, getAccountUrl} from '@figment-near/lib';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  getCurrentStepIdForCurrentChain,
  useGlobalState,
  getCurrentChainId,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getNearState} from '@figment-near/lib';

import type {CheckAccountIdT, AlertT} from '@figment-near/types';

const {Text} = Typography;

const Account = () => {
  const {state, dispatch} = useGlobalState();
  const {NETWORK, SECRET, ACCOUNT_ID} = getNearState(state);

  const [freeAccountId, setFreeAccountId] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);

  useEffect(() => {
    if (accountId) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.ACCOUNT_ID,
        value: accountId,
      });
    }
  }, [accountId, setAccountId]);

  const createAccountWithId = async () => {
    const publicKey = SECRET && getPublicKey(SECRET);
    setIsFetching(true);
    try {
      const response = await axios.post(`/api/near/create-account`, {
        freeAccountId,
        publicKey,
        NETWORK,
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
    NETWORK,
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
          {ACCOUNT_ID && (
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
                      href={getAccountUrl(ACCOUNT_ID)}
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
  NETWORK,
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
        NETWORK,
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
