import { Dispatch, SetStateAction } from 'react'
import { KeyPair } from "near-api-js";
import { Alert, Button, Col, Space, Typography } from 'antd';

type KeyPairT = KeyPair | undefined;

type KeyPairGeneratorPropsT = {
    keypair: KeyPairT,
    setKeypair: Dispatch<SetStateAction<KeyPairT>>
}

const { Text } = Typography;

const KeyPairGenerator = ({ keypair, setKeypair }: KeyPairGeneratorPropsT) => {

    const generateKeypair = () => {
        // alert("Implement the generateKeypair() function!");
        const keypair = KeyPair.fromRandom('ed25519');
        setKeypair(keypair);
    }
    const publicKeyStr = keypair?.getPublicKey().toString().slice(8);

    const KeyPairStatusBox = () =>
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
    
    return (
    <>
        <Col>
            <Space direction="vertical" size="middle" >        
                <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>
                    Generate a Keypair
                </Button>
                { keypair && <KeyPairStatusBox /> }
            </Space>
        </Col>
    </>
    );
}

export default KeyPairGenerator
