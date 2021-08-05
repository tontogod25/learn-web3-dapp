import { Alert, Button, Col, Space, Typography } from 'antd';
import { Keypair } from "@solana/web3.js";
import { useAppState } from '@solana/hooks'
import { useEffect, useState } from 'react';

const { Text } = Typography;

const Account = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null)
  const { dispatch, state } = useAppState();

  useEffect( () => {
    if (state?.secretKey) {
      const secret = Uint8Array.from(JSON.parse(state.secretKey))
      setKeypair(Keypair.fromSecretKey(secret))
    }
  }, [])

  const generateKeypair = () => {
    const keypair = Keypair.generate();
    console.log(keypair.secretKey);
      dispatch({
        type: "SetSecretKey",
        secretKey: JSON.stringify(Array.from(keypair?.secretKey)),
    })
    dispatch({
      type: "SetPublicKey",
      publicKey: keypair?.publicKey.toString()
    })
  }
  const publicKeyStr = keypair && keypair.publicKey.toString();

  return (
    <Col>
      <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>Generate a Keypair</Button>
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
                  <Text>It's accessible (and copyable) at the top right of this page.</Text>
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
