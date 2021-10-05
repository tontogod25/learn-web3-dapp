import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Button, Modal} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {ErrorBox} from '@the-graph/components/error';
import type {ErrorT} from '@the-graph/types';
import {prettyError} from '@the-graph/lib';
// import Confetti from 'react-confetti';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';

const GraphNode = () => {
  const {state, dispatch} = useGlobalState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);

  useEffect(() => {
    if (isValid) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
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
      const response = await axios.get(`/api/the-graph/manifest`);
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
            Test manifest{' '}
          </Button>
          {isValid ? (
            <>
              <Alert
                message={<Space>Manifest file is looking good!</Space>}
                type="success"
                showIcon
              />
            </>
          ) : (
            <Alert
              message="Manifest File not yet ready!"
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
