import {Alert, Button, Col, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {KeyPair} from 'near-api-js';

const {Text} = Typography;

const Keys = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (state?.secret) {
      const publicKeyStr = KeyPair.fromString(state.secret)
        .getPublicKey()
        .toString()
        .slice(8);
      setAddress(publicKeyStr as string);
    }
  }, [state, dispatch]);

  const generateKeypair = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`/api/near/keypair`);
      dispatch({
        type: 'SetNearSecret',
        secret: response.data,
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
        Generate a Keypair
      </Button>
      {address && (
        <Col>
          <Space direction="vertical">
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
          </Space>
        </Col>
      )}
    </Col>
  );
};

export default Keys;
