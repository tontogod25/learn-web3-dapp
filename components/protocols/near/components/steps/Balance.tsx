import {useState} from 'react';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import {useGlobalState} from 'context';
import {getAccountUrl} from '@figment-near/lib';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 24;

const Balance = () => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.near;
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const {network, accountId} = state;

  const getBalance = async () => {
    setError(null);
    setFetching(true);
    setBalance(0);
    try {
      const response = await axios.post(`/api/near/balance`, state);
      const intoNear = (parseFloat(response.data) / DECIMAL_OFFSET).toFixed();
      setBalance(parseFloat(intoNear));
    } catch (error) {
      const data = error.data;
      setError(data);
    } finally {
      setFetching(false);
    }
  };

  const explorerUrl = getAccountUrl(accountId as string);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            Below is the <span style={{fontWeight: 'bold'}}>account ID</span>{' '}
            generated previously:
          </Text>
          <Input
            style={{width: '500px', fontWeight: 'bold'}}
            disabled={true}
            defaultValue={accountId}
          />
          <Button type="primary" onClick={getBalance}>
            Check Balance
          </Button>
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : balance != 0 ? (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balance} NEAR`}</Text>
            }
            description={
              <a href={explorerUrl} target="_blank" rel="noreferrer">
                View the address on NEAR Explorer
              </a>
            }
            type="success"
            closable
            showIcon
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Balance;
