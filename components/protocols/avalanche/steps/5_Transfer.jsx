import { useState } from "react"
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

const Transfer = ({ keypair }) => {
  const [toAddress, setToAddress] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [txSignature, setTxSignature] = useState(null);

  const generateKeypair = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/account`)
      .then(res => {
        console.log(res)
        setToAddress(res.data)
      })
  }
  
  const transfer = (values) => {

  // Initialize chain components
  // const client =
  const chain = client.XChain()
  const keychain = chain.keyChain()

  // Import X-chain key from the previously created file
  const data = JSON.parse(fs.readFileSync(`${credentialsPath}/keypair.json`))
  const key = keychain.importKey(data.privkey)
  
  const amountNumber = parseFloat(values.amount);
  
  if (isNaN(amountNumber)) {
    setError("Amount needs to be a valid number")
  }
    
    // const fromPubKey = new PublicKey(values.from);
    // const toPubKey = new PublicKey(toAddress);

    // const privateKey = 
  
    // const signers = [
    //   {
    //     publicKey: fromPubKey,
    //     secretKey: new Uint8Array(keypair.secretKey)
    //   }
    // ];
  
    // const instructions = SystemProgram.transfer({
    //   fromPubkey: fromPubKey,
    //   toPubkey: toPubKey,
    //   lamports: amountNumber,
    // });
    
    // const transaction = new Transaction().add(instructions);
  
    setTxSignature(null);
    setFetching(true);
  
    // sendAndConfirmTransaction(
    //   connection,
    //   transaction,
    //   signers,
    // ).then((signature) => {
    //   setTxSignature(signature)
    //   setFetching(false);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   setFetching(false);
    // })
  };

  // const explorerUrl = getTxExplorerURL(txSignature);

  return (
    <Form
      {...layout}
      name="transfer"
      layout="horizontal"
      onFinish={transfer}
      initialValues={{
        from: keypair.getPublicKeyString
      }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Text code>{keypair}</Text>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 AVAX = 0.00000000001 nAVAX">
        <Space direction="vertical">
          <Input suffix="AVAX" style={{ width: "200px" }} />
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" required>
        <Space direction="horizontal">
          {toAddress && <Text code>{toAddress}</Text>}
          <Button size="small" type="dashed" onClick={generateKeypair} icon={<RedoOutlined />}>Generate an address</Button>
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


// CLI https://docs.solana.com/cli/transfer-tokens#transfer-tokens-from-your-first-wallet-to-the-second-address

// Random example code from Google https://githubmemory.com/repo/1Crazymoney/math-solana-js
// web3.js docs https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction

// SEE lib/transfer.js for working code
