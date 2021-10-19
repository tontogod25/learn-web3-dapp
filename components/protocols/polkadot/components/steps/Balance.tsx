import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@figment-polkadot/hooks';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 12;

const Balance = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const {state} = useAppState();

  const getBalance = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/polkadot/balance`, state)
      .then((res) => {
        const amount = res.data;
        const intoWND = (amount / DECIMAL_OFFSET).toFixed();
        setBalance(parseFloat(intoWND));
        setFetching(false);
      })
      .catch((err) => {
        const data = err.data;
        console.log(err);
        setFetching(false);
        setBalance(0);
        setError(data);
      });
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            Below the <span style={{fontWeight: 'bold'}}>address</span> you
            generated previously:
          </Text>
          <Input
            style={{width: '500px', fontWeight: 'bold'}}
            disabled={true}
            defaultValue={state?.address}
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
              >{`This address has a balance of ${balance} WND`}</Text>
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
