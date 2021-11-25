import {Alert, Col, Button, Space, Typography} from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';

import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const {mnemonic, contractId} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (typeof value === 'number') {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [value, setValue]);

  const getCounter = async () => {
    setError(null);
    setFetching(true);
    setValue(null);
    try {
      const response = await axios.post(`/api/secret/getter`, {
        mnemonic,
        contractId,
      });
      setValue(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Button type="primary" onClick={getCounter} loading={fetching}>
            Get the stored value
          </Button>
        </Space>
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
          <Alert message="Please complete the code" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
