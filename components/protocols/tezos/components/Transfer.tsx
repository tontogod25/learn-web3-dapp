import {useEffect, useState} from 'react';
import {Form, Input, Button, Alert, Space, Typography, Col} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';

import {transactionUrl} from '@figment-tezos/lib';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const RECIPIENT = 'tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY';

const Transfer = () => {
  const {state, dispatch} = useGlobalState();
  const {network, mnemonic, email, password, secret, address} =
    getInnerState(state);

  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  const transfer = async (values: any) => {
    setFetching(true);
    setError(null);
    setHash(null);
    const txAmount = parseFloat(values.amount);
    try {
      if (isNaN(txAmount)) {
        throw new Error('Invalid amount: Please enter a number!');
      }
      const response = await axios.post(`/api/tezos/transfer`, {
        network,
        mnemonic,
        email,
        password,
        secret,
        amount: txAmount,
        recipient: RECIPIENT,
      });
      setHash(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      setError(errorMessage);
    } finally {
      setFetching(false);
    }
  };

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

        <Form.Item label="Amount" name="amount" required>
          <Space direction="vertical">
            <Input
              suffix="μꜩ"
              style={{width: '200px'}}
              placeholder={'enter amount in μꜩ'}
            />
          </Space>
        </Form.Item>

        <Form.Item label="Recipient" name="to" required>
          <Text code>{RECIPIENT}</Text>
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
              style={{maxWidth: '350px'}}
              type="success"
              showIcon
              message={<Text strong>Transfer confirmed!</Text>}
              description={
                <a href={transactionUrl(hash)} target="_blank" rel="noreferrer">
                  View on transaction Explorer
                </a>
              }
            />
          </Form.Item>
        )}

        {error && (
          <Form.Item {...tailLayout}>
            <Alert type="error" showIcon message={error} />
          </Form.Item>
        )}
      </Form>
    </Col>
  );
};

export default Transfer;
