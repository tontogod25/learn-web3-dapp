import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {transactionExplorer} from '@solana/lib';
import {ErrorBox} from '@solana/components';
import {useEffect, useState} from 'react';
import {useAppState} from '@solana/context';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import axios from 'axios';

const {Text} = Typography;

const Setter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string>('');
  const [message, setMessage] = useState<number>(-1);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (hash) {
      state.validator(9);
    }
  }, [hash, setHash]);

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
    const getGreeting = async () => {
      setError(null);
      setFetching(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/getter`,
          state,
        );
        setMessage(response.data);
      } catch (error) {
        setError(prettyError(error));
      } finally {
        setFetching(false);
      }
    };
    getGreeting();
  }, [hash, state]);

  const setGreetings = async () => {
    setError(null);
    setResetting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/setter`,
        state,
      );
      setHash(response.data);
      dispatch({
        type: 'SetValidate',
        validate: 9,
      });
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setResetting(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Text>Number of greetings:</Text>
        <Col>
          {fetching ? (
            <LoadingOutlined style={{fontSize: 24}} spin />
          ) : (
            <Alert
              style={{fontWeight: 'bold', textAlign: 'center'}}
              type="success"
              closable={false}
              message={message >= 0 ? message : 'NaN'}
            />
          )}
        </Col>
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={setGreetings}>
                Send Greeting
              </Button>
            </Space>
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : hash.length !== 0 ? (
              <Alert
                message={<Text strong>{`The greeting has been sent`}</Text>}
                description={
                  <a
                    href={transactionExplorer(hash, state.network)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Solana Explorer
                  </a>
                }
                type="success"
                closable
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
