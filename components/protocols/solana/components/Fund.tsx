import {Alert, Button, Space, Col, Input, Typography, Modal} from 'antd';
import {transactionExplorer} from '@figment-solana/lib';
import {ErrorT, ErrorBox, prettyError} from 'utils/error';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {SOLANA_NETWORKS as NETWORK} from 'types';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Fund = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network: network0} = getInnerState(state);
  //  Need this fix as Mainnet-Beta doesn't have airdrop feature
  const network = network0 === NETWORK.MAINNET ? NETWORK.DEVNET : network0;

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);

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

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const airdrop = async () => {
    setFetching(true);
    setError(null);
    setHash(null);
    try {
      const response = await axios.post(`/api/solana/fund`, {address, network});
      if (response.data.length === 0) {
        throw new Error('Complete the code');
      }
      setHash(response.data);
    } catch (error) {
      if (error.message === 'Complete the code') {
        setError({message: 'Complete the code'});
      } else {
        setError(prettyError(error));
      }
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Input
          style={{width: '420px', fontWeight: 'bold'}}
          defaultValue={address}
          disabled={true}
        />
        <Button type="primary" onClick={airdrop} loading={fetching}>
          Fund this address
        </Button>
        {hash && (
          <Alert
            message={<Text strong>Address Funded!</Text>}
            description={
              <a
                href={transactionExplorer(network)(hash)}
                target="_blank"
                rel="noreferrer"
              >
                View on Solana Explorer
              </a>
            }
            type="success"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Fund;
