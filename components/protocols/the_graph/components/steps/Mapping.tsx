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

const {Text} = Typography;

const Mapping = () => {
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
      const response = await axios.get(`/api/the-graph/mapping`);
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
          Check subgraph deployment
        </Button>
        {isValid ? (
          <>
            <Alert
              message={<Text strong>We found a deployed subgraph! 🎉</Text>}
              description={
                <Space direction="vertical">
                  <div>The time is come to collect the fruits of our work.</div>
                  <div>
                    Now let&apos;s query tweak the subgraph to display some
                    revelant information about cryptopunk. Let&apos;s go do the
                    next step!
                  </div>
                </Space>
              }
              type="success"
              showIcon
            />
          </>
        ) : error ? (
          <Alert
            message={<Text strong>We couldn&apos;t find a subgraph 😢</Text>}
            description={
              <Space direction="vertical">
                <div>Are you sure the subgraph was deployed?</div>
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

export default Mapping;
