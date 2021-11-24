import {useState, useEffect} from 'react';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import axios from 'axios';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 6;

const Balance = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (balance) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [balance, setBalance]);

  const getBalance = async () => {
    setFetching(true);
    setError(null);
    setBalance(null);
    try {
      const response = await axios.post(`/api/secret/balance`, {
        network,
        address,
      });
      const amount = response.data;
      const intoSCRT = (amount / DECIMAL_OFFSET).toFixed();
      setBalance(parseFloat(intoSCRT));
    } catch (error) {
      setError(error.message);
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
        {balance ? (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balance} SOL`}</Text>
            }
            type="success"
            showIcon
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Generate a Keypair" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Balance;
