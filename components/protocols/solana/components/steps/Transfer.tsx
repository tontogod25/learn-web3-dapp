import { useState } from "react"
import { Keypair } from "@solana/web3.js";
import { Form, Input, Button, Alert, Space, Typography, Col } from 'antd';
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';
import { transactionExplorer } from  "@solana/lib";
import { useAppState } from "@solana/hooks";
import axios from 'axios'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

const Transfer = () => {
  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { state } = useAppState()

  const generate = () => {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    setRecipient(address);
  }

  const transfer = (values: any) => {
      const lamports = parseFloat(values.amount)
      if (isNaN(lamports)) {
          setError("Amount needs to be a valid number")
          throw Error('Invalid Amount')
      }

      setFetching(true)
      axios
        .post(`/api/solana/transfer`, {...state, lamports, recipient })
        .then(res => {
          setTxHash(res.data)
          setFetching(false)
      })
      .catch(err => {
          console.error(err)
          setFetching(false)
      })
	}

  const explorerUrl = transactionExplorer(txHash as string);

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Form
        {...layout}
        name="transfer"
        layout="horizontal"
        onFinish={transfer}
        initialValues={{
          from: state?.address
        }}
      > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{state?.address}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 SOL = 10**9 LAMPORTS">
        <Space direction="vertical">
          <Input suffix="lamports" style={{ width: "200px" }} />
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" required>
        <Space direction="horizontal">
          {recipient && <Text code>{recipient}</Text>}
          <Button size="small" type="dashed" onClick={generate} icon={<RedoOutlined />}>Generate an address</Button>
        </Space>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={fetching}>
          Submit Transfer
        </Button>
      </Form.Item>

        {fetching &&
          <Form.Item {...tailLayout}>
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text type="secondary">Transfer initiated. Waiting for confirmations...</Text>
            </Space>
          </Form.Item>
        }

        {txHash &&
          <Form.Item {...tailLayout}>
            <Alert
              type="success"
              showIcon
              message={
                <Text strong>Transfer confirmed!</Text>
              }
              description={
                <a href={explorerUrl} target="_blank" rel="noreferrer">View on Solana Explorer</a>
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
              onClose={() => setError(null)}
            />
          </Form.Item>
        }
      </Form>
    </Col>
  );
};

export default Transfer
