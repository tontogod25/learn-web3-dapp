/* eslint-disable react-hooks/exhaustive-deps */
import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json';
import {Alert, Button, Col, Space, Statistic} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {ethers} from 'ethers';

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const [fetching, setFetching] = useState<boolean>(false);
  const [contractNumber, setContractNumber] = useState<string | null>(null);

  useEffect(() => {
    if (contractNumber) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [contractNumber, setContractNumber]);

  const getValue = async () => {
    setFetching(true);
    setContractNumber(null);
    try {
      setFetching(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // try to figure out the expected parameters
      const contract = new ethers.Contract(undefined);
      // try to figure out the expected method
      const storage = undefined;
      setContractNumber(storage.toString());
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getValue}>
          Get Value
        </Button>
        {fetching && <LoadingOutlined style={{fontSize: 24}} spin />}
        {!fetching && (
          <Alert
            showIcon
            type="success"
            message={<Statistic value={contractNumber as string} />}
          />
        )}
      </Space>
    </Col>
  );
};

export default Getter;
