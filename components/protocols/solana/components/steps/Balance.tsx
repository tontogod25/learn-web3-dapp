import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import {ErrorBox} from '@solana/components/nav';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import {useEffect, useState} from 'react';
import {
  getCurrentChainId,
  useGlobalState,
  getChainCurrentStepId,
  getChainNetwork,
  getChainInnerState,
} from 'context';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Balance = () => {
  const {state, dispatch} = useGlobalState();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const chainId = getCurrentChainId(state);
  const stepId = getChainCurrentStepId(state, chainId);
  const network = getChainNetwork(state, chainId);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to check the balance',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const getBalance = async () => {
    setFetching(true);
    setError(null);
    try {
      const response = await axios.post(`/api/solana/balance`, {
        network,
        address,
      });
      setBalance(response.data / LAMPORTS_PER_SOL);
      dispatch({
        type: 'SetChainProgressIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    } catch (error) {
      setError(prettyError(error));
      setBalance(null);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Input
          style={{width: '420px', fontWeight: 'bold'}}
          defaultValue={address as string}
          disabled={true}
        />
        <Button type="primary" onClick={getBalance} loading={fetching}>
          Check Balance
        </Button>
        {balance && (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balance} SOL`}</Text>
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

export default Balance;
