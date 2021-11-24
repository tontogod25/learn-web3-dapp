import {Alert, Button, Col, Space, Typography, Modal} from 'antd';
import {ErrorT, ErrorBox, prettyError} from 'utils/error';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Keypair = () => {
  const {dispatch} = useGlobalState();

  const [address, setAddress] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to connect',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

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
    setFetching(true);
    setError(null);
    setAddress(null);
    setSecret(null);
    try {
      const response = await axios.get(`/api/solana/keypair`);
      setAddress(response.data.address);
      setSecret(response.data.secret);
    } catch (error) {
      setError(prettyError(error));
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
        ) : (
          <Alert message="Please Generate a Keypair" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Keypair;
