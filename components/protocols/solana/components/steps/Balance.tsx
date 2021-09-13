import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import {ErrorBox} from '@solana/components';
import {useAppState} from '@solana/context';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import {useEffect, useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Balance = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const {state, dispatch} = useAppState();

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/balance`,
        state,
      );
      setBalance(response.data / LAMPORTS_PER_SOL);
      dispatch({
        type: 'SetValidate',
        validate: 4,
      });
    } catch (error) {
      setError(prettyError(error));
      setBalance(null);
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
