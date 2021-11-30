import {useEffect, useState} from 'react';
import {Alert, Button, Col, Space, Typography} from 'antd';
import axios from 'axios';

import {PROTOCOL_INNER_STATES_ID} from 'types';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const FAUCET_URL = 'https://celo.org/developers/faucet';

const Account = () => {
  const {state, dispatch} = useGlobalState();
  const {network} = getInnerState(state);

  const [address, setAddress] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address && secret) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.ADDRESS]: address,
          },
          {
            [PROTOCOL_INNER_STATES_ID.SECRET]: secret,
          },
        ],
        isCompleted: true,
      });
    }
  }, [address, secret]);

  const generateKeypair = async () => {
    try {
      setFetching(true);
      setAddress(null);
      setSecret(null);
      setError(null);
      const response = await axios.post(`/api/celo/account`, {network});
      setAddress(response.data.address);
      setSecret(response.data.secret);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={generateKeypair}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Generate a Keypair
        </Button>
        {address && secret ? (
          <>
            <Alert
              message={
                <Space>
                  <Text strong>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <div>
                    This is the string representation of the public key <br />
                    <Text code>{address}</Text>.
                  </div>
                  <Text>
                    Accessible (and copyable) at the top right of this page.
                  </Text>
                </div>
              }
              type="success"
              showIcon
            />
            <Alert
              message={
                <Space>
                  <Text strong>Fund your new account</Text>
                </Space>
              }
              description={
                <a href={FAUCET_URL} target="_blank" rel="noreferrer">
                  Go to the faucet
                </a>
              }
              type="warning"
              showIcon
            />
          </>
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Generate a Keypair" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Account;
