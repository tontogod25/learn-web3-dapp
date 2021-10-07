import {Button, Alert, Space, Typography, Col} from 'antd';
import {getPolygonTxExplorerURL} from '@polygon/lib';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';

// A random test's address
const recipient = '0xb11D554F2139d843F5c94a3185d17C4d5762a7c7';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Transfer = () => {
  const {state, dispatch} = useGlobalState();
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    checkBalance();
  }, []);

  useEffect(() => {
    if (balance) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [balance, setBalance]);

  const checkBalance = async () => {
    setFetching(true);
    setBalance(null);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const selectedAddress = window.ethereum.selectedAddress;
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
    setError(null);
    setHash(null);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const send_account = provider.getSigner().getAddress();

      const currentGasPrice = await provider.getGasPrice();
      const gas_price = ethers.utils.hexlify(
        parseInt(currentGasPrice.toString()),
      );

      const transaction = undefined;

      const hash = undefined;
      const receipt = await hash.wait();
      setHash(receipt.transactionHash);
    } catch (error) {
      setError(error.message);
    } finally {
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
            message={<Text strong>{`Transfer failed: ${error}`}</Text>}
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
