import { useState } from "react"
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { Wallet } from "ethers";
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';

import { PolygonAccountT } from "types/polygon-types";
import { getPolygonTxExplorerURL } from "utils/polygon-utils";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

const Transfer = ({ account }: { account: PolygonAccountT }) => {
  const [toAddress, setToAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const generate = () => {
    const wallet = Wallet.createRandom();
    setToAddress(wallet.address);
  }

  const transfer = (values: any) => {
    alert("Implement the transfer() function!");
    return

    const amountNumber = parseFloat(values.amount);
  
    if (isNaN(amountNumber)) {
      setError("Amount needs to be a valid number")
    }

  };

  const explorerUrl = txSignature ? getPolygonTxExplorerURL(txSignature) : ""

  return (
    <Form
      {...layout}
      name="transfer"
      layout="horizontal"
      onFinish={transfer}
      initialValues={{
        from: account
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{account}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required>
        <Space direction="vertical">
          <Input suffix="MATIC" style={{ width: "200px" }} />
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" required>
        <Space direction="horizontal">
          {toAddress && <Text code>{toAddress}</Text>}
          <Button size="small" type="dashed" onClick={generate} icon={<RedoOutlined />}>Generate an address</Button>
        </Space>
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
  );
};

export default Transfer