import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import {useAppState} from '@solana/context';
import {ErrorBox} from '@solana/components';
import type {ErrorT} from '@solana/types';
import {useState, useEffect} from 'react';
import {prettyError} from '@solana/lib';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Getter = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [greeting, setGreeting] = useState<number>(-1);
  const {state} = useAppState();

  useEffect(() => {
    if (greeting) {
      if (globalState.valid < 8) {
        globalDispatch({
          type: 'SetValid',
          valid: 8,
        });
      }
    }
  }, [greeting, setGreeting]);

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

  const getGreeting = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/solana/getter`, state);
      setGreeting(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Get the counter&apos;s value from the program:</Text>
          <Button type="primary" onClick={getGreeting} loading={fetching}>
            Get Greeting
          </Button>
        </Space>
        {greeting >= 0 && (
          <Alert
            message={
              <Text
                strong
              >{`The account has been greeted ${greeting} times`}</Text>
            }
            type="success"
            closable
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
