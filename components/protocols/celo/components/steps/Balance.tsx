import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {useAppState} from '@ccelo/hooks';
import {useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 18;

const Balance = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balanceCELO, setBalanceCELO] = useState<number>(-1);
  const [balancecUSD, setBalancecUSD] = useState<number>(-1);
  const {state} = useAppState();

  const getBalance = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/celo/balance`, state)
      .then((res) => {
        const attoCelo = res.data.attoCELO;
        const attoUsd = res.data.attoUSD;
        const celo = (attoCelo / DECIMAL_OFFSET).toFixed();
        const usd = (attoUsd / DECIMAL_OFFSET).toFixed();
        setBalanceCELO(parseFloat(celo));
        setBalancecUSD(parseFloat(usd));
        setFetching(false);
      })
      .catch((err) => {
        const data = err.data;
        console.log(err);
        setFetching(false);
        setBalanceCELO(-1);
        setBalancecUSD(-1);
        setError(data);
      });
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
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
          <Button type="primary" onClick={getBalance} loading={fetching}>
            Check Balance
          </Button>
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {balanceCELO != -1 && (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balanceCELO} CELO`}</Text>
            }
            type="success"
            closable
            showIcon
          />
        )}
        {balancecUSD != -1 && (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balancecUSD} cUSD`}</Text>
            }
            type="success"
            closable
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Balance;
