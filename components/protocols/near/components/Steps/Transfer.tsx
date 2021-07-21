import { useState } from "react"
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppState } from '@near/hooks';
import { getTransactionUrl } from '@near/lib';
import axios from "axios";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

// const DECIMAL_OFFSET = 10**24;

const Transfer = () => {
    const [toAddress, _setToAddress] = useState('pizza.testnet');
    const [error, setError] = useState<string | null>(null);
    const [fetching, setFetching] = useState(false);
    const [txSignature, setTxSignature] = useState(null);
    const { networkId, secretKey, accountId } = useAppState().state;

    const transfer = (values: any) => {
        const txAmount = parseFloat(values.amount);
        if (isNaN(txAmount)) {
            setError("Amount needs to be a valid number")
            throw Error('Invalid Amount')
        }
        const txSender = values.from;
        const txReceiver = values.to;
        const options = {
            txSender,
            txAmount,
            txReceiver,
            networkId,
            secretKey,
        }
        console.log(options)
        setFetching(true)
		axios
			.post(`/api/near/transfer`, options)
			.then(res => {
                const result = res.data
                setTxSignature(result.transaction.hash)
				setFetching(false)
			})
			.catch(err => {
				console.error(err)
				setFetching(false)
			})
	}

  return (
    <Form
      {...layout}
      name="transfer"
      layout="horizontal"
      onFinish={transfer}
      initialValues={{
          from: accountId,
          amount: 1,
          to: toAddress,
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{accountId}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 NEAR = 0.00_000_000_1 nNEAR">
        <Space direction="vertical">
          <Input suffix="NEAR" style={{ width: "200px" }} />
        </Space>
      </Form.Item>

      <Form.Item label="Recipeint" name="to" required>
        <Text code>{toAddress}</Text>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={fetching}>
          Submit Transfer
        </Button>
      </Form.Item>

      {
        fetching &&
          <Form.Item {...tailLayout}>
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text type="secondary">Transfer initiated. Waiting for confirmations...</Text>
            </Space>
          </Form.Item>
      }

      {txSignature &&
        <Form.Item {...tailLayout}>
          <Alert
            type="success"
            showIcon
            message={
              <Text strong>Transfer confirmed!</Text>
            }
            description={
              <a href={getTransactionUrl(networkId)(txSignature ?? '')} target="_blank" rel="noreferrer">View on Near Explorer</a>
            }
          />
        </Form.Item>
      }
      
      {error &&
        <Form.Item {...tailLayout}>
          <Alert
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError('')}
          />
        </Form.Item>
      }
    </Form>
  );
};

export default Transfer
