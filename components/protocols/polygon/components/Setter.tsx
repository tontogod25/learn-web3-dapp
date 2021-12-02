import {useState, useEffect} from 'react';
import {Alert, Col, InputNumber, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';

import {getPolygonTxExplorerURL} from '@figment-polygon/lib';
import {setter} from '@figment-polygon/challenges';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Setter = () => {
  const {dispatch} = useGlobalState();

  const [inputNumber, setInputNumber] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (txHash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [txHash, setTxHash]);

  const setValue = async () => {
    setFetching(true);
    setError(undefined);
    setTxHash(null);
    const {error, hash} = await setter(inputNumber);
    if (error) {
      setError(error);
    } else {
      setTxHash(hash);
    }
    setFetching(false);
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <InputNumber value={inputNumber} onChange={setInputNumber} />
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={setValue}
            loading={fetching}
            size="large"
          >
            Set Value
          </Button>
        </Space>
        {txHash ? (
          <Alert
            showIcon
            type="success"
            message={<Text strong>Transaction confirmed!</Text>}
            description={
              <a
                href={getPolygonTxExplorerURL(txHash)}
                target="_blank"
                rel="noreferrer"
              >
                View on Polyscan
              </a>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : null}
      </Space>
    </Col>
  );
};

export default Setter;
