import React, {useEffect, useState} from 'react';
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
      const response = await axios.get(`/api/the-graph/scaffold`);
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
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={validStep}
          loading={fetching}
          size="large"
        >
          Check for a subgraph scaffold
        </Button>
        {isValid ? (
          <>
            <Alert
              message={<Text strong>We found a subgraph scaffold! 🎉</Text>}
              description={
                <Space direction="vertical">
                  <div>Nice. The pieces are coming together.</div>
                  <div>
                    Now let&apos;s tweak the subgraph to make it do something
                    useful. Let&apos;s go do the next step!
                  </div>
                </Space>
              }
              type="success"
              showIcon
            />
            <SetupWizard />
          </>
        ) : error ? (
          <Alert
            message={<Text strong>We couldn&apos;t find a subgraph 😢</Text>}
            description={
              <Space direction="vertical">
                <div>Are you sure the subgraph was created?</div>
              </Space>
            }
            type="error"
            showIcon
            closable
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default GraphNode;
