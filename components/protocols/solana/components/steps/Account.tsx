import { Alert, Button, Col, Space, Typography } from 'antd';
import { Keypair } from "@solana/web3.js";
import { useAppState } from '@solana/hooks'
import { useEffect, useState } from 'react';

const { Text } = Typography;

const Account = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null)
  const { dispatch, state } = useAppState();

  useEffect( () => {
    if (state?.secret) {
      const secret0 = Uint8Array.from(JSON.parse(state.secret))
      setKeypair(Keypair.fromSecretKey(secret0))
    }
  }, [])

  const publicKeyStr = keypair?.publicKey.toString();

  const generateKeypair = () => {
    const keypair = Keypair.generate();
    setKeypair(keypair)
    console.log(keypair.secretKey);
      dispatch({
        type: "SetSecret",
        secret: JSON.stringify(Array.from(keypair?.secretKey)),
    })
    dispatch({
      type: "SetAddress",
      address: keypair?.publicKey.toString()
    })
  }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>
        Generate a Keypair
      </Button>
      {keypair &&
        <Col>
          <Space direction="vertical">
            <Alert
              message={
                <Space>
                  <Text strong>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <Text>Open the JS console to inspect the Keypair.</Text>
                  <div>
                    This is the string representation of the public key
                    <Text code>{publicKeyStr}</Text>.
                  </div>
                  <Text>Accessible (and copyable) at the top right of this page.</Text>
                </div>
              }
              type="success"
              showIcon
            />
          </Space>
        </Col>
      }
    </Col>
  );
}

export default Account
