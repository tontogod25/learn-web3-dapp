import {Alert, Button, Col, Space} from 'antd';
import {useAppState} from '@polygon/context';
import ReactJson from 'react-json-view';
import {useState} from 'react';
import axios from 'axios';

import {
  PolygonQueryResponse,
  PolygonQueryErrorResponse,
} from 'types/polygon-types';

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

import {LoadingOutlined} from '@ant-design/icons';

const Query = () => {
  const [queryData, setQueryData] = useState<PolygonQueryResponse | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {dispatch} = useAppState();

  const getQuery = () => {
    setFetching(true);

    axios
      .get(`/api/polygon/query`)
      .then((res) => {
        const data: PolygonQueryResponse = res.data;
        setQueryData(data);
        if (!queryData) {
          console.log('queryData not set on first click?');
        } else {
          dispatch({
            type: 'SetValidate',
            validate: 2,
          });
        }
        setFetching(false);
      })
      .catch((err) => {
        console.log(`err.response`, err.response);
        const data: PolygonQueryErrorResponse = err.response?.data;
        setFetching(false);
        setError(data?.message);
      });
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
