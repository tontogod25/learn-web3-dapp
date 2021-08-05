import { useEffect, useState } from "react"
import { Connection, PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';
import { getDatahubNodeURL } from "utils/datahub-utils";
import { getTxExplorerURL } from  "@solana/lib";
import { useAppState } from "@solana/hooks";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

const Transfer = () => {
  const [toAddress, setToAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const { secretKey, publicKey } = useAppState().state;

  const generate = () => {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    setToAddress(address);
  }

  const transfer = (values: any) => {
    // alert("Implement the transfer() function!");

    const lamports = parseFloat(values.amount);
  
    if (isNaN(lamports)) {
      setError("Amount needs to be a valid number")
    }
  
    setTxSignature(null);
    setFetching(true);

    const rpcUrl = "https://api.testnet.solana.com" 
    const connection = new Connection(rpcUrl, "confirmed");

    const fromPubkey = new PublicKey(publicKey as string);
    const toPubkey = new PublicKey(toAddress as  string);

    const instructions = SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });

    const signers = [
      {
        publicKey: fromPubkey,
        secretKey: Uint8Array.from(JSON.parse(secretKey as string))
      }
    ];

    // Create a transaction
    // Add instructions
    // Call sendAndConfirmTransaction
    // On success, call setTxSignature and setFetching

    const transaction = new Transaction().add(instructions);

    setTxSignature(null);
    setFetching(true);
  
    sendAndConfirmTransaction(
      connection,
      transaction,
      signers,
    ).then((signature) => {
      setTxSignature(signature)
      setFetching(false);
    })
    .catch((err) => {
      console.log(err);
      setFetching(false);
    })
    
  };

  const explorerUrl = getTxExplorerURL(txSignature as string);

  return (
    <Form
      {...layout}
      name="transfer"
      layout="horizontal"
      onFinish={transfer}
      initialValues={{
        from: publicKey
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{publicKey}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 lamport = 0.000000001 SOL">
        <Space direction="vertical">
          <Input suffix="lamports" style={{ width: "200px" }} />
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
