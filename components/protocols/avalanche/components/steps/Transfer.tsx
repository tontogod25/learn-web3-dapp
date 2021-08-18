import { useState } from 'react'
import { Form, Input, Button, Alert, Space, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppState } from '@avalanche/hooks'
import { transactionUrl } from '@avalanche/lib'
import axios from 'axios'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

const receiver = "X-fuji1j2zasjlkkvptegp6dpm222q6sn02k0rp9fj92d"

const { Text } = Typography

const Transfer = () => {
    const [error, setError] = useState<string | null>(null)
    const [fetching, setFetching] = useState(false)
    const [hash, setHash] = useState(null)
    const { state } = useAppState()

    const transfer = (values: any) => {
        const isValidAmount = parseFloat(values.amount)
        if (isNaN(isValidAmount)) {
            setError("Amount needs to be a valid number")
            throw Error('Invalid Amount')
        }
        const amount = values.amount

        setFetching(true)
		axios
			.post(`/api/avalanche/transfer`, {...state, amount })
			.then(res => {
        		const hash = res.data
       			setHash(hash)
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
          from: state.address,
          amount: 1,
          to: receiver,
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{state.address}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 AVAX = 10**9 nAVAX">
        <Space direction="vertical">
          <Input suffix="nAVAX" style={{ width: "200px" }} placeholder={'enter amount in nAVAX'}/>
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" name="to" required>
        <Text code>{receiver}</Text>
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

      {hash &&
        <Form.Item {...tailLayout}>
          <Alert
          style={{ maxWidth: '350px'}}
            type="success"
            showIcon
            message={
              <Text strong>Transfer confirmed!</Text>
            }
            description={
              <a href={transactionUrl(hash ?? '')} target="_blank" rel="noreferrer">
                View on Avalanche Explorer
              </a>
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
