import {Form, Input, Button, Alert, Space, Typography, Col, Modal} from 'antd';
import {LoadingOutlined, RedoOutlined} from '@ant-design/icons';
import {prettyError, transactionExplorer} from '@solana/lib';
import {ErrorBox} from '@solana/components/nav';
import type {ErrorT} from '@solana/types';
import {useEffect, useState} from 'react';
import {Keypair} from '@solana/web3.js';
import {
  getCurrentChainId,
  useGlobalState,
  getChainCurrentStepId,
  getChainNetwork,
  getChainInnerState,
} from 'context';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const Transfer = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getChainCurrentStepId(state, chainId);
  const network = getChainNetwork(state, chainId);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );
  const secret = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.SECRET,
  );

  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const generate = () => {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    setRecipient(address);
  };

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to transfer token',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const transfer = async (values: any) => {
    setFetching(true);
    const lamports = parseFloat(values.amount);
    try {
      if (isNaN(lamports)) {
        throw new Error('invalid amount');
      }

      const response = await axios.post(`/api/solana/transfer`, {
        address,
        secret,
        network,
        lamports,
        recipient,
      });
      setHash(response.data);
      dispatch({
        type: 'SetChainProgressIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    } catch (error) {
      if (error.message === 'invalid amount') {
        setError({message: 'invalid amount'});
      } else {
        setError(prettyError(error));
      }
    } finally {
      setFetching(false);
    }
  };

  const explorerUrl = transactionExplorer(hash ?? '', network);

  return (
    <Col>
      <Form
        {...layout}
        name="transfer"
        layout="horizontal"
        onFinish={transfer}
        initialValues={{
          from: address,
        }}
      >
        <Form.Item label="Sender" name="from" required>
          <Text code>{address}</Text>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          required
          tooltip="1 SOL = 1 gigaLAMPORTS"
        >
          <Space direction="vertical">
            <Input suffix="lamports" style={{width: '200px'}} />
          </Space>
        </Form.Item>

        <Form.Item label="Recipient" required>
          <Space direction="horizontal">
            {recipient ? (
              <Text code>{recipient}</Text>
            ) : (
              <Button
                size="small"
                type="dashed"
                onClick={generate}
                icon={<RedoOutlined />}
              >
                Generate an address
              </Button>
            )}
          </Space>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={fetching}>
            Submit Transfer
          </Button>
        </Form.Item>

        {fetching && (
          <Form.Item {...tailLayout}>
            <Space size="large">
              <LoadingOutlined style={{fontSize: 24, color: '#1890ff'}} spin />
              <Text type="secondary">
                Transfer initiated. Waiting for confirmations...
              </Text>
            </Space>
          </Form.Item>
        )}

        {hash && (
          <Form.Item {...tailLayout}>
            <Alert
              type="success"
              showIcon
              message={<Text strong>Transfer confirmed!</Text>}
              description={
                <a href={explorerUrl} target="_blank" rel="noreferrer">
                  View on Solana Explorer
                </a>
              }
            />
          </Form.Item>
        )}
      </Form>
    </Col>
  );
};

export default Transfer;
