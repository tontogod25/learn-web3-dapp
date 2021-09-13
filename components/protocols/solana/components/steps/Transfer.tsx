import {Form, Input, Button, Alert, Space, Typography, Col, Modal} from 'antd';
import {LoadingOutlined, RedoOutlined} from '@ant-design/icons';
import {prettyError, transactionExplorer} from '@solana/lib';
import {ErrorBox} from '@solana/components';
import {useAppState} from '@solana/context';
import type {ErrorT} from '@solana/types';
import {Keypair} from '@solana/web3.js';
import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const Transfer = () => {
  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const {state, dispatch} = useAppState();

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/transfer`,
        {
          ...state,
          lamports,
          recipient,
        },
      );
      setHash(response.data);
      dispatch({
        type: 'SetValidate',
        validate: 5,
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

  const explorerUrl = transactionExplorer(hash ?? '', state.network);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Form
        {...layout}
        name="transfer"
        layout="horizontal"
        onFinish={transfer}
        initialValues={{
          from: state?.address,
        }}
      >
        <Form.Item label="Sender" name="from" required>
          <Text code>{state?.address}</Text>
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
