import { Alert, Button, Col, Space, Typography } from 'antd';
import { Keypair } from "@solana/web3.js";

const { Text, Paragraph } = Typography;

const Account = ({
  keypair,
  setKeypair
}: {
  keypair: Keypair
  setKeypair(keypair: Keypair): void
}) => {
  const generateKeypair = () => {
    const keypair = Keypair.generate();
    setKeypair(keypair);
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