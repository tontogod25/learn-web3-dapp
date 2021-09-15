import {PolygonQueryResponse, PolygonQueryErrorResponse} from '@polygon/types';
import {LoadingOutlined} from '@ant-design/icons';
import {Alert, Button, Col, Space} from 'antd';
import {useAppState} from '@polygon/context';
import {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import axios from 'axios';

const Query = () => {
  const [queryData, setQueryData] = useState<PolygonQueryResponse | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {state} = useAppState();

  useEffect(() => {
    if (queryData) {
      state.validator(2);
    }
  }, [queryData, setQueryData]);

  const getQuery = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/polygon/query`);
      setQueryData(response.data);
      setFetching(false);
    } catch (error) {
      const data = error.response?.data;
      setFetching(false);
      setError(data?.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Button type="primary" onClick={getQuery}>
            Query Polygon
          </Button>
          {fetching ? (
            <LoadingOutlined style={{fontSize: 24}} spin />
          ) : queryData ? (
            <div
              style={{
                minHeight: '300px',
                maxHeight: '300px',
                maxWidth: '750px',
                minWidth: '750px',
                overflow: 'scroll',
              }}
            >
              <ReactJson src={queryData} theme={'hopscotch'} />
            </div>
          ) : null}
          {error && (
            <Alert
              type="error"
              showIcon
              closable
              message={error}
              onClose={() => setError(null)}
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Query;
