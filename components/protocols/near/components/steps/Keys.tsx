import {Alert, Button, Col, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {
  getCurrentStepIdForCurrentChain,
  useGlobalState,
  getCurrentChainId,
} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getNearState, getPrettyPublicKey} from '@figment-near/lib';

const {Text} = Typography;

const Keys = () => {
  const {state, dispatch} = useGlobalState();
  const {SECRET} = getNearState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    if (secret) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
      dispatch({
        type: 'SetStepInnerState',
        chainId: getCurrentChainId(state),
        innerStateId: PROTOCOL_INNER_STATES_ID.SECRET,
        value: secret,
      });
    }
  }, [secret, setSecret]);

  useEffect(() => {
    if (SECRET) {
      setSecret(SECRET);
    }
  }, []);

  const generateKeypair = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`/api/near/keypair`);
      setFetching(false);
      setSecret(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Button
        type="primary"
        onClick={generateKeypair}
        style={{marginBottom: '20px'}}
        loading={fetching}
      >
        Generate a Keypair
      </Button>
      {secret && (
        <Col>
          <Space direction="vertical">
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
                    <Text code>{getPrettyPublicKey(secret)}</Text>.
                  </div>
                  <Text>
                    Accessible (and copyable) at the top right of this page.
                  </Text>
                </div>
              }
              type="success"
              showIcon
            />
          </Space>
        </Col>
      )}
    </Col>
  );
};

export default Keys;
