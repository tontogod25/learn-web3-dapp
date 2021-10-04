/* eslint-disable react-hooks/exhaustive-deps */
import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json';
import {Alert, Button, Col, InputNumber, Space, Typography} from 'antd';
import {getPolygonTxExplorerURL} from '@polygon/lib';
import {LoadingOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {ethers} from 'ethers';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';

const {Text} = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const [inputNumber, setInputNumber] = useState<number>(0);
  const [fetchingSet, setFetchingSet] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<boolean>(false);

  const setValue = async () => {
    setFetchingSet(true);
    setTxHash(null);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Try to figure out the expected parameters
    // @ts-ignore
    const contract = new ethers.Contract(undefined);

    try {
      // Try to figure out the expected method
      // @ts-ignore
      const transactionResult = undefined;

      setFetchingSet(false);
      setInputNumber(0);
      setConfirming(true);
      const receipt = await transactionResult.wait();
      setTxHash(receipt.transactionHash);
      setConfirming(false);
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    } catch (error) {
      setFetchingSet(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <InputNumber value={inputNumber} onChange={setInputNumber} />
          <Button type="primary" onClick={setValue}>
            Set Value
          </Button>
        </Space>
        {fetchingSet && (
          <Space direction="horizontal">
            <LoadingOutlined style={{fontSize: 24}} spin />
            {'Sending transaction...'}
          </Space>
        )}
        {confirming && (
          <Space direction="horizontal">
            <LoadingOutlined style={{fontSize: 24}} spin />
            {'Waiting for transaction confirmation...'}
          </Space>
        )}
        {txHash && (
          <Alert
            showIcon
            type="success"
            message={<Text strong>Transaction confirmed!</Text>}
            description={
              <a
                href={getPolygonTxExplorerURL(txHash)}
                target="_blank"
                rel="noreferrer"
              >
                View on Polyscan
              </a>
            }
          />
        )}
      </Space>
    </Col>
  );
};

export default Setter;
