import { useState } from 'react'
import { Form, Input, Button, Alert, Space, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppState } from '@secret/hooks'
import { transactionUrl } from '@secret/lib'
import axios from 'axios'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

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
        const txAmount = values.amount

        setFetching(true)
		axios
			.post(`/api/secret/transfer`, {...state, txAmount })
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
          to: state.address,
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{state.address}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 SCRT = 10**6 uSCRT">
        <Space direction="vertical">
          <Input suffix="uSCRT" style={{ width: "200px" }} placeholder={'enter amount in uSCRT'}/>
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" name="to" required>
        <Text code>{state.address}</Text>
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
                View on Secret Explorer
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
