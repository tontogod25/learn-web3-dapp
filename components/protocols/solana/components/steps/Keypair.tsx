import {Alert, Button, Col, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {useAppState} from '@solana/hooks';
import axios from 'axios';

const {Text} = Typography;

const Keypair = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (state?.address) {
      setAddress(state.address);
    }
  }, []);

  const generateKeypair = async () => {
    setFetching(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/keypair`,
    );
    setAddress(response.data.address);
    dispatch({
      type: 'SetSecret',
      secret: response.data.secret,
    });
    dispatch({
      type: 'SetAddress',
      address: response.data.address,
    });
    dispatch({
      type: 'SetValidate',
      validate: 2,
    });
    setFetching(false);
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={generateKeypair}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Generate Keypair
        </Button>
        {address ? (
          <Alert
            message={
              <Space>
                <Text strong>Keypair generated!</Text>
              </Space>
            }
            description={
              <div>
                <div>
                  This is the string representation of the public key <br />
                  <Text code>{address}</Text>
                </div>
                <Text>
                  Accessible (and copyable) at the top right of this page.
                </Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert message="Please Generate a Keypair" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Keypair;
