import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {accountExplorer} from '@solana/lib';
import {useAppState} from '@solana/context';
import {ErrorBox} from '@solana/components';
import type {ErrorT, StepT} from '@solana/types';
import {prettyError} from '@solana/lib';
import {useEffect, useState} from 'react';
import axios from 'axios';

const {Text} = Typography;

const Deploy = ({validate}: StepT) => {
  const [value, setValue] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const {state, dispatch} = useAppState();

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/deploy`,
        {...state, programId: value},
      );
      setChecked(response.data);
      dispatch({
        type: 'SetProgramId',
        programId: value as string,
      });
      dispatch({
        type: 'SetValidate',
        validate: 6,
      });
    } catch (error) {
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
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
                href={accountExplorer(state?.programId ?? '', state.network)}
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
