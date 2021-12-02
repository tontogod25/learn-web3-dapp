import {Alert, Button, Col, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import axios from 'axios';

import {useGlobalState} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Keypair = () => {
  const {dispatch} = useGlobalState();

  const [address, setAddress] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (secret) {
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
  }, [secret]);

  const generateKeypair = async () => {
    setFetching(true);
    setError(null);
    setAddress(null);
    setSecret(null);
    try {
      const response = await axios.get(`/api/near/keypair`);
      setAddress(response.data.address);
      setSecret(response.data.secret);
    } catch (error) {
      setError(error.response.data);
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
          Generate Keypair
        </Button>
        {address ? (
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
                  <Text code>{address}</Text>
                </div>
                <Text>
                  Accessible (and copyable) at the top right of this page.
                </Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Generate a Keypair." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Keypair;
