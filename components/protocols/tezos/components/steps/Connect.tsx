import {useState} from 'react';
import {Alert, Col, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import Confetti from 'react-confetti';
import axios from 'axios';

import {CHAINS} from 'types';
import {CHAINS_CONFIG} from 'lib/constants';

const {Text} = Typography;

const Connect = () => {
  const chainId = CHAINS_CONFIG[CHAINS.TEZOS].label;

  const [version, setVersion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const getConnection = async () => {
    setFetching(true);
    setError(null);
    setVersion(null);
    try {
      const response = await axios.get(`/api/tezos/connect`);
      setVersion(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      {version && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={getConnection}
            loading={fetching}
            size="large"
          />
          {version ? (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
            />
          ) : error ? (
            <Alert
              message={
                <Space>
                  <Text code>Error: {error}</Text>
                </Space>
              }
              type="error"
              showIcon
            />
          ) : (
            <Alert
              message={<Space>Not Connected to {chainId}</Space>}
              type="error"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
