import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {useState} from 'react';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Restore = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');

  const restore = () => {
    try {
      const wallet = undefined;
      const selectedAddress = window.ethereum.selectedAddress;
      if (undefined === selectedAddress) {
        setAddress(undefined);
        setSecret(undefined);
      } else {
        setError('Unable to restore account');
      }
    } catch (error) {
      setAddress(null);
      setSecret(null);
      setError('Invalid mnemonic');
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '490px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            Below enter the <span style={{fontWeight: 'bold'}}>mnemonic</span>{' '}
            of your wallet:
          </Text>
          <Input
            style={{width: '500px', fontWeight: 'bold'}}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button type="primary" onClick={restore}>
            Restore Account
          </Button>
        </Space>
        {error && (
          <Alert
            type="error"
            closable
            message={error}
            onClose={() => setError(null)}
          />
        )}
        {address ? (
          <Alert
            message={
              <Text strong>{`This is the restored address ${address}`}</Text>
            }
            type="success"
            closable
            showIcon
            onClose={() => setAddress(null)}
          />
        ) : null}
        {secret ? (
          <Alert
            message={<Text strong>{`This is the private key ${secret}`}</Text>}
            type="warning"
            closable
            showIcon
            onClose={() => setSecret(null)}
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Restore;
