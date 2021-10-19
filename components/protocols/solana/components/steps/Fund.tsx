import {Alert, Button, Space, Col, Input, Typography, Modal} from 'antd';
import {transactionExplorer, prettyError} from '@figment-solana/lib';
import {ErrorBox} from '@figment-solana/components/nav';
import type {ErrorT} from '@figment-solana/types';
import {useEffect, useState} from 'react';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
  getNetworkForCurrentChain,
  getChainInnerState,
} from 'context';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Fund = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const network = getNetworkForCurrentChain(state);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

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

    try {
      const response = await axios.post(`/api/solana/fund`, {
        address,
        network,
      });
      if (response.data.length === 0) {
        throw new Error('Complete the code');
      }
      setHash(response.data);
      setIsFunded(true);
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
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
          defaultValue={address as string}
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
                href={transactionExplorer(hash, network)}
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
