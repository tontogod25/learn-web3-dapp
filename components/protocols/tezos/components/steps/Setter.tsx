import {useEffect, useState} from 'react';
import {Alert, Col, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import {useAppState} from '@tezos/hooks';
import {transactionUrl} from '@tezos/lib';

const {Text} = Typography;

const Setter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const {state} = useAppState();

  useEffect(() => {
    const getCounter = () => {
      setError(null);
      setFetching(true);
      axios
        .post(`/api/tezos/getter`, state)
        .then((res) => {
          setMessage(res.data);
          setFetching(false);
        })
        .catch((err) => {
          const data = err.response.data;
          setFetching(false);
          setError(data.message);
        });
    };
    getCounter();
  }, [txHash, state]);

  const setCounter = () => {
    setError(null);
    setResetting(true);
    axios
      .post(`/api/tezos/setter`, state)
      .then((res) => {
        setTxHash(res.data);
        setResetting(false);
      })
      .catch((err) => {
        const data = err.response.data;
        setResetting(false);
        setError(data.message);
      });
  };

  return (
    <Col style={{minHeight: '350px'}}>
      <Space direction="vertical" size="large">
        <Text>Current value of the counter stored into the contract:</Text>
        <Col>
          {fetching ? (
            <LoadingOutlined style={{fontSize: 24}} spin />
          ) : (
            <Alert
              style={{fontWeight: 'bold', textAlign: 'center'}}
              type="success"
              closable={false}
              message={message}
            />
          )}
        </Col>
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={setCounter}>
                Increment the value
              </Button>
            </Space>
            {error && <Alert type="error" closable message={error} />}
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : txHash.length !== 0 ? (
              <Alert
                message={
                  <Text strong>{`The value have been incremented`}</Text>
                }
                description={
                  <a
                    href={transactionUrl(txHash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Tezos Explorer
                  </a>
                }
                type="success"
                closable
                showIcon
              />
            ) : null}
          </Space>
        </Col>
      </Space>
    </Col>
  );
};

export default Setter;
