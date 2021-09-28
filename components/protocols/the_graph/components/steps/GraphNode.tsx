import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {ErrorBox} from '@the-graph/components';
import type {ErrorT} from '@the-graph/types';
import {prettyError} from '@the-graph/lib';
import {useGlobalState} from 'context';
// import Confetti from 'react-confetti';
import axios from 'axios';

const GraphNode = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);

  useEffect(() => {
    setIsValid(false);
  }, [globalState.valid]);

  useEffect(() => {
    if (globalState.valid >= 1) {
      setIsValid(true);
    }
  }, []);

  useEffect(() => {
    if (isValid) {
      if (globalState.valid < 1) {
        globalDispatch({
          type: 'SetValid',
          valid: 1,
        });
      }
    }
  }, [isValid, setIsValid]);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'No Local node detected',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const validStep = async () => {
    setFetching(true);
    setIsValid(false);
    setError(null);
    try {
      const response = await axios.get(`/api/the-graph/graph-node`);
      setIsValid(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      {/* {isValid && <Confetti tweenDuration={200} run={false} />} */}
      <Col style={{minHeight: '350px', maxWidth: '600px'}}>
        <Space direction="vertical" size="large">
          <Button
            type="ghost"
            icon={<PoweroffOutlined />}
            onClick={validStep}
            loading={fetching}
            size="large"
          >
            {' '}
            Test local graph node{' '}
          </Button>
          {isValid ? (
            <>
              <Alert
                message={<Space>Local graph node setup</Space>}
                type="success"
                showIcon
              />
            </>
          ) : (
            <Alert
              message="No local graph node detected."
              type="error"
              showIcon
            />
          )}
        </Space>
      </Col>
    </>
  );
};

export default GraphNode;
