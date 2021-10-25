import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@figment-near/lib';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  getCurrentStepIdForCurrentChain,
  useGlobalState,
  getCurrentChainId,
} from 'context';
import {getNearState} from '@figment-near/lib';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const nearState = getNearState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');

  useEffect(() => {
    if (txHash) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [txHash, setTxHash]);

  const deployContract = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/near/deploy`, nearState);
      setTxHash(response.data);
    } catch (error: any) {
      const data = error.response.data;
      setError(data);
    } finally {
      setFetching(false);
    }
  };

  const txUrl = getTransactionUrl(txHash);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <Button type="primary" onClick={deployContract}>
            Deploy the contract
          </Button>
          <Input
            style={{
              minWidth: '200px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={true}
            defaultValue={nearState.ACCOUNT_ID as string}
          />
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : txHash.length !== 0 ? (
          <Alert
            message={<Text strong>{`The contract has been deployed!`}</Text>}
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
  );
};

export default Deploy;
