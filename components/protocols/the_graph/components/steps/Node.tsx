import React, {useEffect, useState, useRef} from 'react';
import {Col, Alert, Space, Button, Typography} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import type {ErrorT} from '@the-graph/types';
import {prettyError} from '@the-graph/lib';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';
import Confetti from 'react-confetti';
import SetupWizard from 'components/shared/SetupWizard';

const {Text} = Typography;

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

  const validStep = async () => {
    setFetching(true);
    setIsValid(false);
    setError(null);
    try {
      const response = await axios.get(`/api/the-graph/node`);
      setIsValid(response.data);
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        {isValid && (
          <Confetti
            numberOfPieces={500}
            tweenDuration={1000}
            gravity={0.05}
            // should we use the GRT colors?
            // colors={['#5943d0', '#151324']}
          />
        )}
        <Space direction="vertical" size="large">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={validStep}
            loading={fetching}
            size="large"
          >
            Check local Graph node
          </Button>
          {isValid ? (
            <>
              <Alert
                message={
                  <Text strong>Your local Graph node is running! 🎉</Text>
                }
                description={
                  <Space>
                    but... it&apos;s not doing much. Let&apos;s give it some
                    code to run for us. Click on the button at the bottom right
                    to go to the next step.
                  </Space>
                }
                type="success"
                showIcon
              />
              <SetupWizard />
            </>
          ) : error ? (
            <Alert
              message={
                <Text strong>
                  We couldn&apos;t find a running Graph node 😢
                </Text>
              }
              description={
                <Space direction="vertical">
                  <div>
                    We tried to make a request to http://localhost:8020 but we
                    got:
                  </div>
                  <Text code>{error.message}</Text>
                </Space>
              }
              type="error"
              showIcon
              closable
            />
          ) : null}
        </Space>
      </Space>
    </Col>
  );
};

export default GraphNode;
