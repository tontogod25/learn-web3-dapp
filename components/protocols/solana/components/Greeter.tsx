import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {transactionExplorer} from '@figment-solana/lib';
import {useState, useEffect} from 'react';
import {ErrorT, ErrorBox, prettyError} from 'utils/error';
import axios from 'axios';
import {useGlobalState} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Greeter = () => {
  const {state, dispatch} = useGlobalState();
  const {network, secret, greeter, programId} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);

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
    if (address) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.GREETER]: address,
          },
        ],
        isCompleted: true,
      });
    }
  }, [address]);

  const setGreeterAccount = async () => {
    setError(null);
    setHash(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/solana/greeter`, {
        network,
        secret,
        programId,
      });
      setHash(response.data.hash);
      setAddress(response.data.greeter);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            We&apos;re going to derive the greeter account from the programId
          </Text>
          <Input
            placeholder={programId as string}
            disabled={true}
            style={{width: '500px'}}
          />
          <Button
            type="primary"
            onClick={setGreeterAccount}
            loading={fetching}
            disabled={!!greeter}
          >
            Create Greeter
          </Button>
          {hash && (
            <Alert
              message={
                <Text>
                  <a
                    href={transactionExplorer(network)(hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Solana Explorer
                  </a>
                </Text>
              }
              type="success"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Greeter;
