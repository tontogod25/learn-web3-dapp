import {useState} from 'react';
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
  const {mnemonic, email, password, secret, network, address} =
    getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const feedStorage = () => {
    try {
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
    } catch (error) {
      setError('Incorrect JSON format');
    }
  };

  const createAccount = async () => {
    setFetching(true);
    setActivated(false);
    setError(null);
    try {
      await axios.post(`/api/tezos/account`, {
        mnemonic,
        email,
        password,
        secret,
        network,
      });
      setActivated(true);
      setFetching(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  if (mnemonic) {
    return (
      <Col style={{minHeight: '350px'}}>
        <Space direction="vertical" size="large">
          <Alert
            message={
              <Space>
                <Text strong>Wallet parsed</Text>
              </Space>
            }
            type="success"
            showIcon
          />
          <Button
            type="primary"
            onClick={createAccount}
            style={{marginBottom: '20px'}}
            loading={fetching}
            disabled={activated}
          >
            Activate Account
          </Button>
          {activated ? (
            <Alert
              message={
                <Space>
                  <Text strong>Account activated</Text>
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
  }

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
        />
        <Button
          type="primary"
          onClick={feedStorage}
          style={{marginBottom: '20px'}}
        >
          Feed the storage
        </Button>
      </Space>
    </Col>
  );
};

export default Account;
