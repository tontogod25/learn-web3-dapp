import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@figment-near/lib';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {
  getCurrentStepIdForCurrentChain,
  useGlobalState,
  getCurrentChainId,
} from 'context';
import {getNearState} from '@figment-near/lib';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const nearState = getNearState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (newMessage) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [newMessage, setNewMessage]);

  useEffect(() => {
    const contractGetter = async () => {
      setError(null);
      setFetching(true);
      try {
        const response = await axios.post(`/api/near/getter`, nearState);
        setMessage(response.data);
      } catch (error: any) {
        setError(error.response.data);
      } finally {
        setFetching(false);
      }
    };
    contractGetter();
  }, [txHash, setTxHash]);

  const contractSetter = async () => {
    setError(null);
    setResetting(true);
    try {
      const response = await axios.post(`/api/near/setter`, {
        ...nearState,
        newMessage,
      });
      setTxHash(response.data);
    } catch (error: any) {
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
