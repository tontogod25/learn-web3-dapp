import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import {ErrorBox, ErrorT, prettyError} from 'utils/error';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';
import axios from 'axios';

const {Text} = Typography;

const Balance = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  useEffect(() => {
    if (balance) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [balance, setBalance]);

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
    setBalance(null);
    try {
      const response = await axios.post(`/api/solana/balance`, {
        network,
        address,
      });
      setBalance(response.data / LAMPORTS_PER_SOL);
    } catch (error) {
      setError(prettyError(error));
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
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Balance;
