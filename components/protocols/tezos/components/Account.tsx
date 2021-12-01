import {useState, useEffect} from 'react';
import {Alert, Button, Col, Space, Typography, Input} from 'antd';
import axios from 'axios';

import {PROTOCOL_INNER_STATES_ID} from 'types';
import {accountExplorer} from '@figment-tezos/lib';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;
const {TextArea} = Input;

type WalletT = {
  mnemonic: string[];
  activation_code: string;
  amount: string;
  pkh: string;
  password: string;
  email: string;
};

const FAUCET_URL = 'https://teztnets.xyz/hangzhounet-faucet';

const Account = () => {
  const {state, dispatch} = useGlobalState();
  const {network, address} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activated) {
      const walletInfo: WalletT = JSON.parse(wallet as string);
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.ADDRESS]: walletInfo.pkh,
          },
          {
            [PROTOCOL_INNER_STATES_ID.SECRET]: walletInfo.activation_code,
          },
          {
            [PROTOCOL_INNER_STATES_ID.PASSWORD]: walletInfo.password,
          },
          {
            [PROTOCOL_INNER_STATES_ID.EMAIL]: walletInfo.email,
          },
          {
            [PROTOCOL_INNER_STATES_ID.MNEMONIC]: walletInfo.mnemonic.join(' '),
          },
        ],
        isCompleted: true,
      });
    }
  }, [activated, setActivated]);

  const createAccount = async () => {
    const walletInfo: WalletT = JSON.parse(wallet as string);
    setFetching(true);
    setActivated(false);
    setError(null);
    try {
      const response = await axios.post(`/api/tezos/account`, {
        ...walletInfo,
        network,
      });
      setActivated(response.data);
      setFetching(true);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px'}}>
      <Space direction="vertical">
        <Alert
          message={
            <Space>
              <Text strong>
                <a href={FAUCET_URL} target="_blank" rel="noreferrer">
                  Go to the faucet
                </a>
              </Text>
            </Space>
          }
          description={
            <Text>
              Copy and paste the json information into the text area below
            </Text>
          }
          type="warning"
          showIcon
        />
        <TextArea
          rows={5}
          onChange={(event) => setWallet(event.target.value)}
          disabled={activated}
        />
        <Button
          type="primary"
          onClick={createAccount}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Create Account
        </Button>
        {activated ? (
          <Alert
            message={
              <Space>
                <Text strong>Account created</Text>
              </Space>
            }
            type="success"
            showIcon
            description={
              <Text strong>
                <a
                  href={accountExplorer(network)(address)}
                  target="_blank"
                  rel="noreferrer"
                >
                  View the account on Tezos Explorer
                </a>
              </Text>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Account;
