import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Typography} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';
import SetupWizard from 'components/shared/SetupWizard';
import {StepButton} from 'components/shared/Button.styles';
import {useColors} from 'hooks';
import {EntityStepStatusesT} from '@the-graph/types';
import {defaultEntityStatus} from '@the-graph/lib';

const {Text} = Typography;

const Entity = () => {
  const {state, dispatch} = useGlobalState();

  const [status, setStatus] =
    useState<EntityStepStatusesT>(defaultEntityStatus);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));

  const isValid = () =>
    Object.values(status).reduce((completion, statusField) => {
      return completion && statusField.isValid;
    }, true);

  useEffect(() => {
    if (isValid()) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [status, setStatus]);

  const validStep = async () => {
    setFetching(true);
    setError(null);

    try {
      const response = await axios.get(`/api/the-graph/entity`);
      setStatus(response.data);
    } catch (error) {
      setError(error.response.data.message);
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
        {isValid() ? (
          <>
            <Alert
              message={<Text strong>We found the expected entities! 🎉</Text>}
              description={
                <Space direction="vertical">
                  <EntityStatus status={status} />
                  <div>
                    Now let's map our entities to the smart contract events.
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
                <Text>This is the error we're getting:</Text>
                <Text code>{error}</Text>
                {error.indexOf('ENOENT') > -1 && (
                  <Text>{`Are you sure you ran 'yarn codegen'?`}</Text>
                )}
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

const EntityStatus = ({
  status,
  text,
}: {
  status: EntityStepStatusesT;
  text?: string;
}) => {
  return (
    <Space direction="vertical">
      {text && <div>{text}</div>}
      <Space direction="vertical">
        {Object.values(status).map((status, index) => {
          return (
            <Space direction="horizontal" key={index}>
              <div>
                {status.isValid ? (
                  <CheckOutlined size={16} style={{color: 'green'}} />
                ) : (
                  <CloseOutlined size={16} style={{color: 'red'}} />
                )}
              </div>
              <div>{status.message}</div>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
};

export default Entity;
