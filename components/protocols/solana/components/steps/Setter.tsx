import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {transactionExplorer} from '@figment-solana/lib';
import {ErrorBox} from '@figment-solana/components/nav';
import {useEffect, useState} from 'react';
import type {ErrorT} from '@figment-solana/types';
import {prettyError} from '@figment-solana/lib';
import {
  getCurrentChainId,
  useGlobalState,
  getNetworkForCurrentChain,
  getChainInnerState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';

import axios from 'axios';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const network = getNetworkForCurrentChain(state);
  const secret = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.SECRET,
  );
  const programId = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.CONTRACT_ID,
  );
  const greeter = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.GREETER,
  );

  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string>('');
  const [message, setMessage] = useState<number>(-1);

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
    if (message === -1) return;

    dispatch({
      type: 'SetStepIsCompleted',
      chainId,
      stepId: getCurrentStepIdForCurrentChain(state),
      value: true,
    });
  }, [message]);

  useEffect(() => {
    const getGreeting = async () => {
      setError(null);
      setFetching(true);
      try {
        const response = await axios.post(`/api/solana/getter`, {
          greeter,
          secret,
          programId,
          network,
        });
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
                    href={transactionExplorer(hash, network)}
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
