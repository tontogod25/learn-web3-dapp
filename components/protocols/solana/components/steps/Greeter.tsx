import {Alert, Col, Input, Button, Space, Typography, Modal} from 'antd';
import {accountExplorer, transactionExplorer} from '@solana/lib';
import {ErrorBox} from '@solana/components';
import {useAppState} from '@solana/hooks';
import {useState, useEffect} from 'react';
import type {ErrorT} from '@solana/types';
import {prettyError} from '@solana/lib';
import axios from 'axios';

const {Text} = Typography;

const Greeter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [hash, setHash] = useState<string | null>(null);
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

  const setGreeterAccount = async () => {
    setError(null);
    setHash(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/solana/greeter`, state);
      setHash(response.data.hash);
      dispatch({
        type: 'SetGreeter',
        greeter: response.data.greeter,
      });
      dispatch({
        type: 'SetValidate',
        validate: 7,
      });
    } catch (error) {
      console.log(prettyError(error));
      setError(prettyError(error));
    } finally {
      setFetching(false);
    }
  };

  if (state?.greeter) {
    return (
      <Col style={{minHeight: '350px', maxWidth: '600px'}}>
        <Space direction="vertical">
          <Text>Greeter account created</Text>
          <Alert
            message={
              <a
                href={accountExplorer(state?.greeter ?? '', state.network)}
                target="_blank"
                rel="noreferrer"
              >
                View the account on Solana Explorer
              </a>
            }
            type="success"
            showIcon
          />
          {hash && (
            <Alert
              message={
                <Text>
                  <a
                    href={transactionExplorer(hash ?? '', state.network)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Solana Explorer
                  </a>
                </Text>
              }
              type="warning"
              showIcon
            />
          )}
        </Space>
      </Col>
    );
  }

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            We&apos;re going to derive the greeter account from the programId
          </Text>
          <Input
            placeholder={state?.programId}
            disabled={true}
            style={{width: '500px'}}
          />
          <Button type="primary" onClick={setGreeterAccount} loading={fetching}>
            Create Greeter
          </Button>
        </Space>
      </Space>
    </Col>
  );
};

export default Greeter;
