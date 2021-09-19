import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {useAppState} from '@polygon/context';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Restore = () => {
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');
  const {state} = useAppState();

  useEffect(() => {
    if (address) {
      state.validator(3);
    }
  }, [address, setAddress]);

  const restore = () => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(value.trim());
      const selectedAddress = window.ethereum.selectedAddress;
      if (wallet && wallet.address.toLocaleLowerCase() === selectedAddress) {
        setAddress(wallet.address.toLocaleLowerCase());
        setSecret(wallet.privateKey.toLocaleLowerCase());
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
