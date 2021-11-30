import {Alert, Col, Button, Space, Typography} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Deposit = () => {
  const {state, dispatch} = useGlobalState();
  const {network} = getInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [deposit, setDeposit] = useState<number | null>(null);

  useEffect(() => {
    if (deposit) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [deposit, setDeposit]);

  const getDeposit = async () => {
    setFetching(true);
    setError(null);
    setDeposit(null);
    try {
      const response = await axios.post(`/api/polkadot/deposit`, {
        network,
      });
      setDeposit(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getDeposit} loading={fetching}>
          Get Existential Deposit
        </Button>
        {deposit ? (
          <Alert
            message={<Text strong>{`Existential deposit: ${deposit}`}</Text>}
            type="success"
            showIcon
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Deposit;
