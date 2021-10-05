import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {setStepsStatus} from 'utils';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 9;

const Balance = ({stepId}: {stepId: string}) => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.avalanche;
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const getBalance = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/avalanche/balance`, state);
      setBalance(
        parseFloat((parseFloat(response.data) / DECIMAL_OFFSET).toFixed()),
      );
      dispatch({
        type: 'SetAvalancheStepsStatus',
        stepsStatus: setStepsStatus(state.stepsStatus, stepId, true),
      });
    } catch (error) {
      const data = error.data;
      setBalance(0);
      setError(data);
    } finally {
      setFetching(false);
    }
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
              >{`This address has a balance of ${balance} AVAX`}</Text>
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
