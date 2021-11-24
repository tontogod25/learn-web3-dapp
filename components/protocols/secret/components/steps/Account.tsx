import {useEffect, useState} from 'react';
import {Alert, Button, Col, Space, Typography} from 'antd';
import {useAppState} from '@figment-secret/hooks';
import axios from 'axios';
import {mnemonic} from 'avalanche/dist/utils';

const {Text} = Typography;

const Account = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (state?.address) {
      setAddress(state.address);
    }
  }, []);

  const generateKeypair = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`/api/secret/account`);
      const mnemonic = response.data.mnemonic;
      const address = response.data.address;
      setAddress(address);
      dispatch({
        type: 'SetMnemonic',
        mnemonic: mnemonic,
      });
      dispatch({
        type: 'SetAddress',
        address: address,
      });
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      {address && (
        <Col>
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
        </Col>
      )}
    </Col>
  );
};

export default Account;
