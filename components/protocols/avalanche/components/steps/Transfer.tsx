import {Form, Input, Button, Alert, Space, Typography, Col} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {transactionUrl} from '@avalanche/lib';
import {useState, useEffect} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {setStepsStatus} from 'utils';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const recipient = 'X-fuji1j2zasjlkkvptegp6dpm222q6sn02k0rp9fj92d';

const {Text} = Typography;

const Transfer = ({stepId}: {stepId: string}) => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.avalanche;
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);

  const transfer = async (values: any) => {
    setFetching(true);
    const navax = parseFloat(values.amount);
    try {
      if (isNaN(navax)) {
        throw new Error('invalid amount');
      }

      const response = await axios.post(`/api/avalanche/transfer`, {
        ...state,
        navax,
        recipient,
      });
      setHash(response.data);
      dispatch({
        type: 'SetAvalancheStepsStatus',
        stepsStatus: setStepsStatus(state.stepsStatus, stepId, true),
      });
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
          from: state.address,
          amount: 1,
          to: recipient,
        }}
      >
        <Form.Item label="Sender" name="from" required>
          <Text code>{state.address}</Text>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          required
          tooltip="1 AVAX = 10**9 nAVAX"
        >
          <Space direction="vertical">
            <Input
              suffix="nAVAX"
              style={{width: '200px'}}
              placeholder={'enter amount in nAVAX'}
            />
          </Space>
        </Form.Item>

        <Form.Item label="Recipient" name="to" required>
          <Text code>{recipient}</Text>
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
                <a
                  href={transactionUrl(hash ?? '')}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Avalanche Explorer
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
