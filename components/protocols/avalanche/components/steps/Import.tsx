import {Col, Button, Alert, Space} from 'antd';
import {transactionUrl} from '@avalanche/lib';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';
import {setStepsStatus} from 'utils';

const Import = ({stepId}: {stepId: string}) => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.avalanche;
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [hash, setHash] = useState(null);

  const importToken = async () => {
    setFetching(true);
    try {
      const response = await axios.post(`/api/avalanche/import`, state);
      setHash(response.data);
      dispatch({
        type: 'SetAvalancheStepsStatus',
        stepsStatus: setStepsStatus(state.stepsStatus, stepId, true),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical">
        <Button type="primary" onClick={importToken} loading={fetching}>
          Import to C-Chain
        </Button>
        {hash && (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={
              <a
                href={transactionUrl(hash ?? '')}
                target="_blank"
                rel="noreferrer"
              >
                View transaction on Avalanche Explorer
              </a>
            }
          />
        )}
        {error && (
          <Alert
            style={{maxWidth: '350px'}}
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError('')}
          />
        )}
      </Space>
    </Col>
  );
};

export default Import;
