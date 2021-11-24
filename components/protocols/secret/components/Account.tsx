import {useEffect, useState} from 'react';
import {Alert, Button, Col, Space, Typography} from 'antd';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Account = () => {
  const {dispatch} = useGlobalState();

  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address && mnemonic) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.ADDRESS]: address,
          },
          {
            [PROTOCOL_INNER_STATES_ID.MNEMONIC]: mnemonic,
          },
        ],
        isCompleted: true,
      });
    }
  }, [address, mnemonic]);

  const generateKeypair = async () => {
    setFetching(true);
    setError(null);
    setAddress(null);
    setMnemonic(null);
    try {
      const response = await axios.get(`/api/secret/account`);
      setAddress(response.data.address);
      setMnemonic(response.data.mnemonic);
      setFetching(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Button
        type="primary"
        onClick={generateKeypair}
        style={{marginBottom: '20px'}}
        loading={fetching}
      >
        Generate a mnemonic
      </Button>
      {mnemonic && address ? (
        <Space direction="vertical">
          <Alert
            message={
              <Space>
                <Text strong>Mnemonic generated!</Text>
              </Space>
            }
            description={
              <div>
                Your generated address: <br />
                <Text strong mark>
                  {address}
                </Text>
                <br />
                Your generated mnemonic: <br />
                <Text code strong>
                  {mnemonic.slice(0, 24)} ... {mnemonic.slice(-24)}
                </Text>
              </div>
            }
            type="success"
            showIcon
          />
          <Alert
            message={
              <Text strong>
                Accessible (and copyable) at the top right of this page.
              </Text>
            }
            type="info"
            showIcon
          />
          <Alert
            message={
              <a
                href={`https://faucet.supernova.enigma.co/`}
                target="_blank"
                rel="noreferrer"
              >
                Fund your new account
              </a>
            }
            type="error"
            showIcon
          />
        </Space>
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Alert message="Please Generate a Keypair" type="error" showIcon />
      )}
    </Col>
  );
};

export default Account;
