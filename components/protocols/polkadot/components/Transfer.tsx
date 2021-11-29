import {useEffect, useState} from 'react';
import {Form, Input, Button, Alert, Space, Typography, Col} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';

import {transactionUrl} from '@figment-polkadot/lib';
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

const RECIPIENT_ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

const Transfer = () => {
  const {state, dispatch} = useGlobalState();
  const {address, mnemonic, network} = getInnerState(state);

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
        throw new Error('invalid amount');
      }
      const response = await axios.post(`/api/polkadot/transfer`, {
        mnemonic,
        address,
        network,
        txAmount,
        recipient: RECIPIENT_ADDR,
      });
      setHash(response.data);
    } catch (error) {
      setError(error.message);
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
              suffix="planck"
              style={{width: '200px'}}
              placeholder={'enter amount in planck'}
            />
          </Space>
        </Form.Item>

        <Form.Item label="Recipient" name="to" required>
          <Text code>{RECIPIENT_ADDR}</Text>
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
                  View on Block Explorer
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
