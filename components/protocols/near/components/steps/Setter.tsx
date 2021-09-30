import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@near/lib';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Setter = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const contractGetter = async () => {
      setError(null);
      setFetching(true);
      try {
        const response = await axios.post(`/api/near/getter`, state);
        setMessage(response.data);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setFetching(false);
      }
    };
    contractGetter();
  }, [txHash, state]);

  const contractSetter = async () => {
    setError(null);
    setResetting(true);
    try {
      const response = await axios.post(`/api/near/setter`, {
        ...state,
        newMessage,
      });
      setTxHash(response.data);
      setResetting(false);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setResetting(false);
    }
  };

  const txUrl = getTransactionUrl(txHash);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Text>
          Below is the message stored on the &quot;greeter&quot; contract:
        </Text>
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
              <Button type="primary" onClick={contractSetter}>
                Set greeting
              </Button>
              <Input
                style={{
                  minWidth: '200px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                defaultValue={message}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Space>
            {error && <Alert type="error" closable message={error} />}
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : txHash.length !== 0 ? (
              <Alert
                message={<Text strong>{`The message has been reset`}</Text>}
                description={
                  <a href={txUrl} target="_blank" rel="noreferrer">
                    View the transaction on NEAR Explorer
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
