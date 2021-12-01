import {useState, useEffect} from 'react';
import {Alert, Col, Button, Space, Typography} from 'antd';
import axios from 'axios';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const {accountId, network} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [value, setValue]);

  const getValue = async () => {
    setError(null);
    setFetching(true);
    setValue(null);
    try {
      const response = await axios.post(`/api/near/getter`, {
        accountId,
        network,
      });
      setValue(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getValue} loading={fetching}>
          Get the stored value
        </Button>
        {value ? (
          <Alert
            message={
              <Text strong>
                This is the stored value: <Text code>{value}</Text>
              </Text>
            }
            type="success"
            showIcon
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
