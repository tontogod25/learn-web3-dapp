import {useEffect, useState} from 'react';
import {Alert, Button, Col, Space, Typography} from 'antd';
import {useAppState} from '@polkadot/hooks';
import axios from 'axios';

const {Text} = Typography;

const Estimate = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [fees, setFees] = useState<number>(0);
  const {state} = useAppState();

  const estimateFees = () => {
    setFetching(true);
    axios
      .post(`/api/polkadot/estimate`, state)
      .then((res) => {
        const amount = res.data;
        setFees(amount);
        setFetching(false);
      })
      .catch((err) => {
        const data = err.data;
        console.log(err);
        setFetching(false);
        setFees(0);
      });
  };

  return (
    <Col>
      <Space direction="vertical">
        <Text strong>Calculate the estimated fees for a simple transfer</Text>
        <Button
          type="primary"
          onClick={estimateFees}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Calculate
        </Button>
      </Space>
      {fees != 0 && (
        <Col>
          <Space direction="vertical">
            <Alert
              message={
                <Space>
                  <Text strong>This is the estimated fee</Text>
                </Space>
              }
              description={
                <Text code style={{fontWeight: 'bold'}}>
                  {fees} Planck
                </Text>
              }
              type="success"
              showIcon
            />
          </Space>
        </Col>
      )}
    </Col>
  );
};

export default Estimate;
