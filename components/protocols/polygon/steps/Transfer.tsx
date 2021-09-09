import {useState} from 'react';
import {Button, Alert, Space, Typography, Col} from 'antd';
import {getPolygonTxExplorerURL} from 'utils/polygon-utils';
import {ethers} from 'ethers';
import {useEffect} from 'react';

// A random test's address
const recipient = '0xb11D554F2139d843F5c94a3185d17C4d5762a7c7';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Transfer = () => {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState('');
  const [balance, setBalance] = useState('');
  const [fetchingBalance, setFetchingBalance] = useState(false);

  useEffect(() => {
    const checkBalance = async () => {
      setFetchingBalance(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const selectedAddress = window.ethereum.selectedAddress;
      const selectedAddressBalance = await provider.getBalance(selectedAddress);
      const balanceToDisplay = ethers.utils.formatEther(
        selectedAddressBalance.toString(),
      );
      setBalance(balanceToDisplay);
      setFetchingBalance(false);
    };
    checkBalance();
  }, [hash, setHash]);

  const transfer = async () => {
    setFetching(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const send_account = provider.getSigner().getAddress();

      const currentGasPrice = await provider.getGasPrice();
      const gas_price = ethers.utils.hexlify(
        parseInt(currentGasPrice.toString()),
      );

      // try to figure out the expected parameters
      // to build a transaction
      const transaction = undefined;

      // try to figure out the expected method
      const hash = undefined;
      const receipt = await hash.wait();
      setHash(receipt.transactionHash);
      setFetching(false);
    } catch (error) {
      setError(error);
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
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Transfer;
