import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {getInnerState} from 'utils/context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {ErrorBox, ErrorT, prettyError} from 'utils/error';
import {accountExplorer} from '@figment-solana/lib';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const {network} = getInnerState(state);

  const [value, setValue] = useState<string | null>(null);
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

  useEffect(() => {
    if (address) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.PROGRAM_ID]: address,
          },
        ],
        isCompleted: true,
      });
    }
  }, [address]);

  const checkDeployment = async () => {
    setError(null);
    setFetching(true);
    try {
      await axios.post(`/api/solana/deploy`, {
        network,
        programId: value,
      });
      setAddress(value);
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
        {address && (
          <Alert
            message={<Text strong>{`The program is correctly deployed`}</Text>}
            description={
              <a
                href={accountExplorer(network)(address)}
                target="_blank"
                rel="noreferrer"
              >
                View the program on Solana Explorer
              </a>
            }
            type="success"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default Deploy;
