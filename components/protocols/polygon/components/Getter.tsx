import {useState, useEffect} from 'react';
import {Alert, Col, Space, Statistic, Button} from 'antd';
import {PoweroffOutlined, LoadingOutlined} from '@ant-design/icons';

import {useGlobalState} from 'context';
import {getValue} from '@figment-polygon/challenges';

const Getter = () => {
  const {dispatch} = useGlobalState();

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [contractNumber, setContractNumber] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (contractNumber) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [contractNumber, setContractNumber]);

  const getContractValue = async () => {
    setFetching(true);
    setError(undefined);
    setContractNumber(undefined);
    const {error, value} = await getValue();
    if (error) {
      setError(error);
    } else {
      setContractNumber(value);
    }
    setFetching(false);
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={getContractValue}
          loading={fetching}
          size="large"
        >
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
        {error && <Alert message={error} type="error" showIcon />}
      </Space>
    </Col>
  );
};

export default Getter;
