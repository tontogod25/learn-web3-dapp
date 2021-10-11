import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Typography} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';
import SetupWizard from 'components/shared/SetupWizard';
import {StepButton} from 'components/shared/Button.styles';
import {useColors} from 'hooks';

const {Text} = Typography;

const Entity = () => {
  const {state, dispatch} = useGlobalState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));

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
      const response = await axios.get(`/api/the-graph/entity`);
      setIsValid(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col key={fetching as unknown as React.Key}>
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
          Check for expected entities
        </StepButton>
        {isValid ? (
          <>
            <Alert
              message={<Text strong>We found the expected entities! 🎉</Text>}
              description={
                <Space direction="vertical">
                  <div>Nice. One more step done in the right direction.</div>
                  <div>
                    Now let&apos;s map our entities to the smart-contract event!
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
            message={
              <Text strong>We couldn&apos;t find the expected entities 😢</Text>
            }
            description={
              <Space direction="vertical">
                <Text>Are you sure the expected entities was created?</Text>
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

export default Entity;
