import {Alert, Button, Space, Col, Input, Typography, Modal} from 'antd';
import {transactionExplorer, prettyError} from '@solana/lib';
import {ErrorBox} from '@solana/components';
import {useAppState} from '@solana/context';
import type {ErrorT, StepT} from '@solana/types';
import {useEffect, useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Fund = ({validate}: StepT) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [isFunded, setIsFunded] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');
  const {state, dispatch} = useAppState();

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
    console.log(state);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/fund`,
        state0 ?? state,
      );
      setHash(response.data);
      setIsFunded(true);
      validate(3);
    } catch (error) {
      setError(prettyError(error));
      setIsFunded(false);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
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
