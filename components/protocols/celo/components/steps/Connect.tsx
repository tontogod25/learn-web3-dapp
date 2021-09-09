import {Alert, Col, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@ccelo/hooks';
import {useEffect, useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Connect = () => {
  const [version, setVersion] = useState<string | null>(null);
  const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);
  const {state, dispatch} = useAppState();
  useEffect(() => {
    const getConnection = () => {
      setFetchingVersion(true);
      axios
        .post(`/api/celo/connect`, state)
        .then((res) => {
          setVersion(res.data);
          setFetchingVersion(false);
        })
        .catch((err) => {
          console.error(err);
          setFetchingVersion(false);
        });
    };
    getConnection();
  }, [state]);

  useEffect(() => {
    if (version) {
      dispatch({
        type: 'SetNetwork',
        network: version,
      });
    }
  }, [version, setVersion]);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      {fetchingVersion ? (
        <LoadingOutlined style={{fontSize: 24}} spin />
      ) : version ? (
        <Alert
          message={
            <Space>
              Connected to Celo!
              <Text code>{version}</Text>
            </Space>
          }
          type="success"
          showIcon
        />
      ) : (
        <Alert message="Not connected to Celo" type="error" showIcon />
      )}
    </Col>
  );
};

export default Connect;
