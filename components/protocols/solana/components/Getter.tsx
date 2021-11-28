import {Alert, Col, Button, Space, Typography, Modal} from 'antd';
import axios from 'axios';

import {ErrorT, ErrorBox, prettyError} from 'utils/error';
import {useState, useEffect} from 'react';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const {network, greeter} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to connect',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  useEffect(() => {
    if (typeof value === 'number') {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [value, setValue]);

  const getGreeting = async () => {
    setError(null);
    setFetching(true);
    setValue(null);
    try {
      const response = await axios.post(`/api/solana/getter`, {
        network,
        greeter,
      });
      setValue(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Get the counter&apos;s value from the program:</Text>
          <Button type="primary" onClick={getGreeting} loading={fetching}>
            Get Greeting
          </Button>
        </Space>
        {value && (
          <Alert
            message={
              <Text
                strong
              >{`The account has been greeted ${value} times`}</Text>
            }
            type="success"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
