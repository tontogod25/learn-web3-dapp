/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Button, Col, Space, Typography} from 'antd';
import {getPolygonAddressExplorerURL} from '@polygon/lib';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@polygon/context';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Balance = () => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (balance != undefined) {
      dispatch({
        type: 'SetValidate',
        validate: 4,
      });
    }
  }, [balance, setBalance]);

  const checkBalance = async () => {
    setFetching(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const selectedAddress = window.ethereum.selectedAddress;

    // TODO
    // Define those two variables
    const selectedAddressBalance = undefined;
    const balanceToDisplay = undefined;

    setBalance(balanceToDisplay);
    setFetching(false);
  };

  const explorerUrl = getPolygonAddressExplorerURL(state.address as string);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" style={{width: '100%'}} size="large">
        <Button type="primary" onClick={checkBalance}>
          Check Balance
        </Button>
        {fetching && (
          <LoadingOutlined style={{fontSize: 24, color: '#1890ff'}} spin />
        )}
        {!fetching ? (
          balance ? (
            <Alert
              message={
                <Space direction="horizontal">
                  <Text
                    strong
                  >{`This address has a balance of ${balance} MATIC`}</Text>
                  <a href={explorerUrl} target="_blank" rel="noreferrer">
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
            />
          ) : (
            <Alert message="No balance to display" type="error" showIcon />
          )
        ) : null}
      </Space>
    </Col>
  );
};

export default Balance;
