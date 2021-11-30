import {Col, Button, Alert, Space, Typography, Input} from 'antd';
import {useState, useEffect, SetStateAction} from 'react';
import axios from 'axios';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Restore = () => {
  const {state, dispatch} = useGlobalState();
  const {mnemonic, address} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [address1, setAddress1] = useState<string | null>(null);

  useEffect(() => {
    if (address1) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [address1, setAddress1]);

  const getBalance = async () => {
    setError(null);
    setFetching(true);
    setAddress1(null);
    try {
      const response = await axios.post(`/api/polkadot/restore`, {
        mnemonic,
      });
      setAddress1(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  const displayedMnemonic = (mnemonic: string) =>
    `${mnemonic.slice(0, 30).trim()} ... ... ... ${mnemonic.slice(-30).trim()}`;

  const checkAddress = () => address === address1;

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text strong>Mnemonic generated previously</Text>
          <Input
            style={{width: '500px', fontWeight: 'bold'}}
            defaultValue={displayedMnemonic(mnemonic)}
            disabled={true}
          />
        </Space>
        <Button type="primary" onClick={getBalance} loading={fetching}>
          Restore Account
        </Button>
        {checkAddress() ? (
          <Alert
            message={<Text strong>{`Restored address:`}</Text>}
            description={<Text code>{address1}</Text>}
            type="success"
            showIcon
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code." type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Restore;
