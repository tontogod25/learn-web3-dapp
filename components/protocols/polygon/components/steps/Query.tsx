import {PolygonQueryResponse} from '@figment-polygon/types';
import {LoadingOutlined} from '@ant-design/icons';
import {Alert, Button, Col, Space} from 'antd';
import {useState} from 'react';
import ReactJson from 'react-json-view';
import axios from 'axios';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';

const Query = () => {
  const {state, dispatch} = useGlobalState();
  const [queryData, setQueryData] = useState<PolygonQueryResponse | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getQuery = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/polygon/query`);
      setQueryData(response.data);
      setFetching(false);
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    } catch (error) {
      const data = error.response?.data;
      setFetching(false);
      setError(data?.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical" style={{overflow: 'hidden'}}>
          <Button type="primary" onClick={getQuery}>
            Query Polygon
          </Button>
          {fetching ? (
            <LoadingOutlined style={{fontSize: 24}} spin />
          ) : queryData ? (
            <div
              style={{
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                overflowY: 'scroll',
                paddingRight: '17px',
                boxSizing: 'content-box',
              }}
            >
              <ReactJson
                src={queryData}
                collapsed={false}
                name={'query data'}
                displayDataTypes={false}
                displayObjectSize={false}
                collapseStringsAfterLength={65}
              />
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
