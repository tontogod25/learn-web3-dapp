import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {accountExplorer} from '@solana/lib';
import {ErrorBox} from '@solana/components/nav';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {
  getCurrentChainId,
  useGlobalState,
  getNetworkForCurrentChain,
  getChainInnerState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const network = getNetworkForCurrentChain(state);
  const programId = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.CONTRACT_ID,
  ) as string;

  const [value, setValue] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to connect',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const checkDeployment = async () => {
    setError(null);
    setChecked(false);
    setFetching(true);
    try {
      const response = await axios.post(`/api/solana/deploy`, {
        network,
        programId: value,
      });
      setChecked(response.data);
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.CONTRACT_ID,
        value: value,
      });
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            Paste the <Text strong>programId</Text> generated after the
            deployment:
          </Text>
          <Input
            placeholder="Enter the program address"
            onChange={(e) => setValue(e.target.value)}
            style={{width: '500px'}}
          />
          <Button type="primary" onClick={checkDeployment} loading={fetching}>
            Check Deployment
          </Button>
        </Space>
        {checked && (
          <Alert
            message={<Text strong>{`The program is correctly deployed`}</Text>}
            description={
              <a
                href={accountExplorer(programId ?? '', network)}
                target="_blank"
                rel="noreferrer"
              >
                View the program on Solana Explorer
              </a>
            }
            type="success"
            closable
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Deploy;
