import {useState} from 'react';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import {useAppState} from '@near/hooks';
import {getAccountUrl} from '@near/lib';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 24;

const Balance = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const {state} = useAppState();
  const {network, accountId} = state;

  const getBalance = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/near/balance`, state)
      .then((res) => {
        const amount = res.data;
        const intoNear = (parseFloat(amount) / DECIMAL_OFFSET).toFixed();
        setBalance(parseFloat(intoNear));
        setFetching(false);
      })
      .catch((err) => {
        const data = err.data;
        setFetching(false);
        setBalance(0);
        setError(data);
      });
  };

  const explorerUrl = getAccountUrl(network)(accountId as string);

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
