import { Alert, Button, Col, Space, Typography } from 'antd';
import { Avalanche } from 'avalanche';
import { getNodeRpcURL } from '../utils'
const { Text, Paragraph } = Typography;

const Account = ({ keypair, setKeypair }) => {

  const url = new URL(getNodeRpcURL());
  const client = new Avalanche(
    url.hostname,
    url.port,
    url.protocol.replace(":", ""),
    parseInt(process.env.REACT_APP_AVALANCHE_NETWORK_ID),
    "X",
    "C",
    process.env.REACT_APP_AVALANCHE_NETWORK_NAME
  );

  // Sets the temporary auth token used for communicating with the node
  client.setAuthToken(process.env.REACT_APP_AVALANCHE_API_KEY)

  const chain = client.XChain()
  const keyChain = chain.keyChain() // keyChain will be the returned instance of KeyChain from AVMAPI

  const generateKeypair = () => {
  const key = keyChain.makeKey() // makeKey returns a keypair

  console.log(key) // The key object, for reference.
  console.log(key.getPublicKeyString()) // Demonstrating what a publicKey looks like 
  console.log(key.getPrivateKeyString()) // Demonstrating what a privateKey looks like

  window.localStorage.setItem('publickey', key.getPublicKeyString());

  const keypair = key.getAddressString(key.getAddress); 

  setKeypair(keypair);
  }
  
  const publicKeyStr = keypair && keypair;

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
                  <Text>It is accessible (and copyable) at the top right of this page.</Text>
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