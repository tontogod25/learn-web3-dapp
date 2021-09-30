import {Alert, Button, Space, Col, Input, Typography, Modal} from 'antd';
import {transactionExplorer, prettyError} from '@solana/lib';
import {ErrorBox} from '@solana/components/nav';
import type {ErrorT} from '@solana/types';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Fund = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.solana;
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [isFunded, setIsFunded] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to fund the address',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const airdrop = async () => {
    setFetching(true);
    setError(null);
    let state0;
    if (state.network === 'datahub') {
      state0 = {...state, network: 'devnet'};
    }
    try {
      const response = await axios.post(`/api/solana/fund`, state0 ?? state);
      if (response.data.length === 0) {
        throw new Error('Complete the code');
      }
      dispatch({
        type: 'SetHighestCompletedStepIndex',
        highestCompletedStepIndex: 1,
      });
      setHash(response.data);
      setIsFunded(true);
    } catch (error) {
      if (error.message === 'Complete the code') {
        setError({message: 'Complete the code'});
      } else {
        setError(prettyError(error));
      }
      setIsFunded(false);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Input
          style={{width: '420px', fontWeight: 'bold'}}
          defaultValue={state.address}
          disabled={true}
        />
        <Button type="primary" onClick={airdrop} loading={fetching}>
          Fund this address
        </Button>
        {isFunded && (
          <Alert
            message={<Text strong>Address Funded!</Text>}
            description={
              <a
                href={transactionExplorer(hash, state.network)}
                target="_blank"
                rel="noreferrer"
              >
                View on Solana Explorer
              </a>
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

export default Fund;
