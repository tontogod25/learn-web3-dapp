import {useEffect, useState} from 'react';
import axios from 'axios';

import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import {ErrorT, ErrorBox, prettyError} from 'utils/error';
import {transactionExplorer} from '@figment-solana/lib';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const {network, greeter, programId, secret} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [message, setMessage] = useState<number | null>(null);

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
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const getGreeting = async () => {
    setError(null);
    setFetching(true);
    setMessage(null);
    try {
      const response = await axios.post(`/api/solana/getter`, {
        network,
        greeter,
      });
      setMessage(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getGreeting();
  }, [hash, setHash]);

  const setGreetings = async () => {
    setResetting(true);
    setError(null);
    setHash(null);
    try {
      const response = await axios.post(`/api/solana/setter`, {
        greeter,
        secret,
        programId,
        network,
      });
      setHash(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setResetting(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Text>Number of greetings:</Text>
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : (
          <Alert
            style={{fontWeight: 'bold', textAlign: 'center'}}
            type="success"
            message={typeof message === 'number' ? message : 'NaN'}
          />
        )}
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={setGreetings}>
                Send Greeting
              </Button>
            </Space>
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : hash ? (
              <Alert
                message={<Text strong>{`The greeting has been sent`}</Text>}
                description={
                  <a
                    href={transactionExplorer(network)(hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Solana Explorer
                  </a>
                }
                type="success"
                showIcon
              />
            ) : null}
          </Space>
        </Col>
      </Space>
    </Col>
  );
};

export default Setter;
