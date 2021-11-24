import {useEffect, useState} from 'react';
import axios from 'axios';

import {Alert, Col, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import {transactionUrl} from '@figment-secret/lib';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const {contractId, mnemonic} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  useEffect(() => {
    getCounter();
  }, [hash, setHash]);

  const getCounter = async () => {
    setError(null);
    setFetching(true);
    setValue(null);
    try {
      const response = await axios.post(`/api/secret/getter`, {
        mnemonic,
        contractId,
      });
      setValue(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  const setCounter = async () => {
    setResetting(true);
    setError(null);
    setHash(null);
    try {
      const response = await axios.post(`/api/secret/setter`, {
        mnemonic,
        contractId,
      });
      setHash(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <>
      <Space direction="vertical" size="large">
        <Text strong>Current value of the counter stored in the contract:</Text>
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : (
          <Alert
            style={{fontWeight: 'bold', textAlign: 'center'}}
            type="success"
            closable={false}
            message={value}
          />
        )}
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={setCounter}>
                Increment the value
              </Button>
            </Space>
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : hash ? (
              <Alert
                message={<Text strong>{`The value has been incremented`}</Text>}
                description={
                  <a
                    href={transactionUrl(hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the transaction on Secret Explorer
                  </a>
                }
                type="success"
                closable
                showIcon
              />
            ) : error ? (
              <Alert message={error} type="error" showIcon />
            ) : (
              <Alert message="Please complete the code" type="error" showIcon />
            )}
          </Space>
        </Col>
      </Space>
    </>
  );
};

export default Setter;
