import {LoadingOutlined} from '@ant-design/icons';
import {Alert, Col, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {useAppState} from '@secret/hooks';
import axios from 'axios';

const {Text} = Typography;

const Connect = () => {
  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state} = useAppState();

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/secret/connect`, state);
      const version = response.data;
      setVersion(version);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <LoadingOutlined style={{fontSize: 24}} spin hidden={!fetching} />
      {version ? (
        <Alert
          message={
            <Text strong>
              connected to Secret version
              <Text code>{version.slice(0, 5)}</Text>
            </Text>
          }
          type="success"
          showIcon
        />
      ) : (
        <Alert message={`Not connected to Secret`} type="error" showIcon />
      )}
    </Col>
  );
};

export default Connect;
