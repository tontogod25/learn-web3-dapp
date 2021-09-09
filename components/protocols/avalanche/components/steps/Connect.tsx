import {useEffect, useState} from 'react';
import axios from 'axios';
import {Alert, Col, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@avalanche/hooks';

const {Text} = Typography;

const Connect = () => {
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state} = useAppState();
  useEffect(() => {
    const getConnection = () => {
      setFetching(true);
      axios
        .post(`/api/avalanche/connect`, state)
        .then((res) => {
          setVersion(res.data);
          setFetching(false);
        })
        .catch((err) => {
          console.error(err);
          setFetching(false);
        });
    };
    getConnection();
  }, [state]);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      {fetching ? (
        <LoadingOutlined style={{fontSize: 24}} spin />
      ) : version ? (
        <Alert
          message={
            <Space>
              Connected to Avalanche!
              <Text code>{version}</Text>
            </Space>
          }
          type="success"
          showIcon
        />
      ) : (
        <Alert message="Not connected to Avalanche" type="error" showIcon />
      )}
    </Col>
  );
};

export default Connect;
