/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import {Alert, Button, Col, Space, Statistic, Typography} from 'antd';
import {ethers} from 'ethers';
import {LoadingOutlined} from '@ant-design/icons';
import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json';

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const {Text} = Typography;

const GetStorage = () => {
  const [fetchingGet, setFetchingGet] = useState<boolean>(false);
  const [contractNumber, setContractNumber] = useState<string | null>(null);

  const getValue = async () => {
    try {
      setFetchingGet(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // try to figure out the expected parameters
      const contract = new ethers.Contract(undefined);
      // try to figure out the expected method
      const storage = undefined;
      setContractNumber(storage.toString());
      setFetchingGet(false);
    } catch (error) {
      console.log(error);
      setFetchingGet(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={getValue}>
          Get Value
        </Button>
        {fetchingGet && <LoadingOutlined style={{fontSize: 24}} spin />}
        {!fetchingGet && (
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

export default GetStorage;
