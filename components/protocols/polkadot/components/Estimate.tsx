import {Col, Button, Alert, Space, Typography} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Estimate = () => {
  const {state, dispatch} = useGlobalState();
  const {address, network} = getInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [fees, setFees] = useState<number | null>(null);

  useEffect(() => {
    if (fees) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [fees, setFees]);

  const getFees = async () => {
    setFetching(true);
    setError(null);
    setFees(null);
    try {
      const response = await axios.post(`/api/polkadot/estimate`, {
        address,
        network,
      });
      setFees(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getFees} loading={fetching}>
          Estimate fees
        </Button>
        {fees ? (
          <Alert
            message={
              <Text strong>{`Existential deposit: ${fees} Plancks`}</Text>
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

export default Estimate;
