import {useState, useEffect} from 'react';
import {Alert, Col, Button, Space, Typography} from 'antd';
import axios from 'axios';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 12;
const TOKEN_SYMBOL = 'WND';

const Balance = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network} = getInnerState(state);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (balance !== null) {
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
      const response = await axios.post(`/api/polkadot/balance`, {
        address,
        network,
      });
      setBalance(
        parseFloat((parseFloat(response.data) / DECIMAL_OFFSET).toFixed()),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getBalance} loading={fetching}>
          Check Balance
        </Button>
        {balance !== null ? (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balance} ${TOKEN_SYMBOL}`}</Text>
            }
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

export default Balance;
