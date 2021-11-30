import {useState, useEffect} from 'react';
import {Alert, Col, Button, Space, Typography} from 'antd';
import axios from 'axios';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 18;
const TOKEN_SYMBOL = 'CELO';

const Balance = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network} = getInnerState(state);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balanceCELO, setBalanceCELO] = useState<number | null>(null);
  const [balanceUSD, setBalanceUSD] = useState<number | null>(null);
  const [balanceEUR, setBalanceEUR] = useState<number | null>(null);

  useEffect(() => {
    if (balanceCELO) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [balanceCELO, setBalanceCELO]);

  const getBalance = async () => {
    setFetching(true);
    setError(null);
    setBalanceCELO(null);
    setBalanceUSD(null);
    setBalanceEUR(null);
    try {
      const response = await axios.post(`/api/celo/balance`, {
        address,
        network,
      });
      setBalanceCELO(
        parseFloat(
          (parseFloat(response.data.attoCELO) / DECIMAL_OFFSET).toFixed(),
        ),
      );
      setBalanceUSD(
        parseFloat(
          (parseFloat(response.data.attoUSD) / DECIMAL_OFFSET).toFixed(),
        ),
      );
      setBalanceEUR(
        parseFloat(
          (parseFloat(response.data.attoEUR) / DECIMAL_OFFSET).toFixed(),
        ),
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
        {balanceUSD && balanceCELO ? (
          <Alert
            message={<Text strong>This address has a balance of:</Text>}
            description={
              <ul>
                <li>
                  {balanceCELO} {TOKEN_SYMBOL}
                </li>
                <li>
                  {balanceUSD} {'cUSD'}
                </li>
                <li>
                  {balanceEUR} {'cEUR'}
                </li>
              </ul>
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
