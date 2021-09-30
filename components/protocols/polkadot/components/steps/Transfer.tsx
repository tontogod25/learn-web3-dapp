import {useState} from 'react';
import {Form, Input, Button, Alert, Space, Typography, Col} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@polkadot/hooks';
import axios from 'axios';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const RECIPIENT_ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

const transactionUrl = (hash: string) =>
  `https://westend.subscan.io/extrinsic/${hash}`;

const Transfer = () => {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);
  const {state} = useAppState();

  const transfer = (values: any) => {
    const isValidAmount = parseFloat(values.amount);
    if (isNaN(isValidAmount)) {
      setError('Amount needs to be a valid number');
      throw Error('Invalid Amount');
    }
    const txAmount = values.amount;

    setFetching(true);
    axios
      .post(`/api/polkadot/transfer`, {...state, txAmount})
      .then((res) => {
        const hash = res.data;
        setHash(hash);
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setFetching(false);
      });
  };

  return (
    <Col>
      <Form
        {...layout}
        name="transfer"
        layout="horizontal"
        onFinish={transfer}
        initialValues={{
          from: state.address,
          amount: 1,
          to: RECIPIENT_ADDR,
        }}
      >
        <Form.Item label="Sender" name="from" required>
          <Text code>{state.address}</Text>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          required
          tooltip="1 WND = 10**12 Planck"
        >
          <Space direction="vertical">
            <Input
              suffix="Planck"
              style={{width: '200px'}}
              placeholder={'enter amount in Planck'}
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
              style={{maxWidth: '365px'}}
              type="success"
              showIcon
              message={<Text strong>Transfer confirmed!</Text>}
              description={
                <a
                  href={transactionUrl(hash ?? '')}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Polkadot Explorer
                </a>
              }
            />
          </Form.Item>
        )}

        {error && (
          <Form.Item {...tailLayout}>
            <Alert
              type="error"
              showIcon
              closable
              message={error}
              onClose={() => setError('')}
            />
          </Form.Item>
        )}
      </Form>
    </Col>
  );
};

export default Transfer;
