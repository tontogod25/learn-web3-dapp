import {Alert, Button, Col, Space, Typography, Modal} from 'antd';
import type {ErrorT} from '@solana/types';
import {ErrorBox} from '@solana/components/nav';
import {useEffect, useState} from 'react';
import {prettyError} from '@solana/lib';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const {Text} = Typography;

const Keypair = () => {
  const {state, dispatch} = useGlobalState();
  const [address, setAddress] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);

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

  const generateKeypair = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/solana/keypair`);
      setAddress(response.data.address);
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.SECRET,
        value: response.data.secret,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.ADDRESS,
        value: response.data.address,
      });
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
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
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={generateKeypair}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Generate Keypair
        </Button>
        {address ? (
          <Alert
            message={
              <Space>
                <Text strong>Keypair generated!</Text>
              </Space>
            }
            description={
              <div>
                <div>
                  This is the string representation of the public key <br />
                  <Text code>{address}</Text>
                </div>
                <Text>
                  Accessible (and copyable) at the top right of this page.
                </Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert message="Please Generate a Keypair" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Keypair;
