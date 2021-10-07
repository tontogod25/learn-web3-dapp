import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Button, Typography, Row} from 'antd';
import {
  PoweroffOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type {ManifestStepStatusesT} from '@the-graph/types';
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
  const [fetching, setFetching] = useState<boolean>(false);
  const [status, setStatus] = useState<ManifestStepStatusesT>({
    block: {
      valid: true,
      message: 'Valid startBlock',
    },
    entities: {
      valid: true,
      message: 'Valid entities',
    },
    eventHandlers: {
      valid: true,
      message: 'Valid eventHandlers',
    },
  });

  useEffect(() => {
    const isValid = Object.values(status).some((el) => el.valid);

    if (isValid) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [status, setStatus]);

  const checkStep = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/the-graph/manifest`);
      setStatus(response.data);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const isValid = Object.values(status).every((el) => el.valid);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={checkStep}
          loading={fetching}
          size="large"
        >
          Check the manifest
        </Button>
        {isValid ? (
          <>
            <Alert
              message={<Text strong>The manifest file looks good! 🎉</Text>}
              description={
                <ManifestStatus
                  status={status}
                  text={'Good job! all the pieces are in place.'}
                />
              }
              type="success"
              showIcon
            />
            <SetupWizard />
          </>
        ) : (
          <Alert
            message={<Text strong>The manifest file is not ready yet 🥺</Text>}
            description={
              <ManifestStatus
                status={status}
                text="Make sure you've changed all the different pieces!"
              />
            }
            type="error"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

const ManifestStatus = ({
  status,
  text,
}: {
  status: ManifestStepStatusesT;
  text: string;
}) => {
  console.log(status);

  return (
    <Space direction="vertical">
      <div>{text}</div>
      <Space direction="vertical">
        {Object.keys(status).map((item) => {
          return (
            <Space direction="horizontal">
              <div>
                {status[item].valid ? (
                  <CheckOutlined size={16} style={{color: 'green'}} />
                ) : (
                  <CloseOutlined size={16} style={{color: 'red'}} />
                )}
              </div>
              <div>{status[item].message}</div>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
};

export default GraphNode;
