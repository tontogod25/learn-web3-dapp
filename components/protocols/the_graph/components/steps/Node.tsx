import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Typography} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useGlobalState} from 'context';
import axios from 'axios';
import Confetti from 'react-confetti';
import {StepButton} from 'components/shared/Button.styles';
import {useColors} from 'hooks';

const {Text} = Typography;

const GraphNode = () => {
  const {state, dispatch} = useGlobalState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {primaryColor, secondaryColor} = useColors(state);

  useEffect(() => {
    if (isValid) {
      dispatch({
        type: 'SetIsCompleted',
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
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col key={`${fetching}`}>
      {isValid && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <StepButton
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={validStep}
          loading={fetching}
          secondary_color={secondaryColor}
          primary_color={primaryColor}
          size="large"
          autoFocus={false}
        >
          Check local Graph node
        </StepButton>
        {isValid ? (
          <>
            <Alert
              message={<Text strong>Your local Graph node is running! 🎉</Text>}
              description={
                <Space>
                  but... it&apos;s not doing much. Let&apos;s give it some code
                  to run for us. Click on the button at the bottom right to go
                  to the next step.
                </Space>
              }
              type="success"
              showIcon
            />
          </>
        ) : error ? (
          <Alert
            message={
              <Text strong>We couldn&apos;t find a running Graph node 😢</Text>
            }
            description={
              <Space direction="vertical">
                <div>
                  We tried to make a request to http://localhost:8020 but we
                  got:
                </div>
                <Text code>{error}</Text>
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
