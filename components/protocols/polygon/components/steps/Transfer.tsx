import {Button, Alert, Space, Typography, Col} from 'antd';
import {getPolygonTxExplorerURL} from '@polygon/lib';
import {useAppState} from '@polygon/context';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

// A random test's address
const recipient = '0xb11D554F2139d843F5c94a3185d17C4d5762a7c7';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Transfer = () => {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [balance, setBalance] = useState('');
  const [hash, setHash] = useState('');
  const {dispatch} = useAppState();

  useEffect(() => {
    checkBalance();
    if (hash) {
      dispatch({
        type: 'SetValidate',
        validate: 5,
      });
    }
  }, [hash, setHash]);

  const checkBalance = async () => {
    setFetching(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const selectedAddress = window.ethereum.selectedAddresss;
      const selectedAddressBalance = await provider.getBalance(selectedAddress);
      const balanceToDisplay = ethers.utils.formatEther(
        selectedAddressBalance.toString(),
      );
      setBalance(balanceToDisplay);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  const transfer = async () => {
    setFetching(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const send_account = provider.getSigner().getAddress();

      const currentGasPrice = await provider.getGasPrice();
      const gas_price = ethers.utils.hexlify(
        parseInt(currentGasPrice.toString()),
      );

      const transaction = {
        from: send_account,
        to: recipient,
        value: ethers.utils.parseEther('0.1'),
        nonce: provider.getTransactionCount(send_account, 'latest'),
        gasLimit: ethers.utils.hexlify(100000),
        gasPrice: gas_price,
      };
      const hash = await provider.getSigner().sendTransaction(transaction);
      const receipt = await hash.wait();
      setHash(receipt.transactionHash);
      setFetching(false);
    } catch (error) {
      setError(error.message);
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '490px'}}>
      <Space direction="vertical" style={{width: '100%'}} size="large">
        <Alert
          message={
            <Space direction="horizontal">
              <Text strong>Your current balance ${balance} MATIC</Text>
            </Space>
          }
          type="warning"
          showIcon
        />
        <Button type="primary" onClick={transfer} loading={fetching}>
          <Text strong>
            Transfer 0.1 MATIC to <Text code>{recipient}</Text>
          </Text>
        </Button>
        {hash ? (
          <Alert
            message={
              <Space direction="horizontal">
                <Text strong>{`Transfer successfully completed`}</Text>
                <a
                  href={getPolygonTxExplorerURL(hash)}
                  target="_blank"
                  rel="noreferrer"
                >
                  (View on PolygonScan)
                </a>
              </Space>
            }
            type="success"
            showIcon
          />
        ) : null}
        {error ? (
          <Alert
            message={<Text strong>{`Transfer failed`}</Text>}
            type="error"
            showIcon
            closable={true}
            onClose={() => setError(null)}
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Transfer;
