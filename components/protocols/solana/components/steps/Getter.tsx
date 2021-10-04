import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import {ErrorBox} from '@solana/components/nav';
import type {ErrorT} from '@solana/types';
import {useState, useEffect} from 'react';
import {prettyError} from '@solana/lib';
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

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const network = getNetworkForCurrentChain(state);
  const greeter = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.GREETER,
  ) as string;

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [greeting, setGreeting] = useState<number>(-1);

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
      const response = await axios.post(`/api/solana/getter`, {
        network,
        greeter,
      });
      setGreeting(response.data);
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
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
