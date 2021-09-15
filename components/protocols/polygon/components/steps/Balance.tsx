/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Button, Col, Space, Typography} from 'antd';
import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {useAppState} from '@polygon/context';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Balance = () => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (balance != undefined) {
      state.validator(4);
    }
  }, [balance, setBalance]);

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

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" style={{width: '100%'}} size="large">
        <Button type="primary" onClick={checkBalance} loading={fetching}>
          Check Balance
        </Button>
        {balance && (
          <Alert
            message={
              <Space direction="horizontal">
                <Text
                  strong
                >{`This address has a balance of ${balance} MATIC`}</Text>
                <a
                  href={getPolygonAddressExplorerURL(state.address ?? '')}
                  target="_blank"
                  rel="noreferrer"
                >
                  (View on PolygonScan)
                </a>
              </Space>
            }
            description={
              <Text>
                Fund your address using the{' '}
                <a
                  href={'https://faucet.matic.network/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  official Matic Faucet
                </a>
              </Text>
            }
            type="success"
            showIcon
            closable={true}
            onClose={() => setBalance(undefined)}
          />
        )}
        {!!balance || (
          <Alert
            message="No balance to display"
            type="error"
            showIcon
            closable={false}
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable={true}
            onClose={() => setError(undefined)}
          />
        )}
        {}{' '}
      </Space>
    </Col>
  );
};

export default Balance;
