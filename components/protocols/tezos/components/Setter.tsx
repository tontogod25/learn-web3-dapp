import {useEffect, useState} from 'react';
import {Alert, Col, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';

import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';
import {transactionUrl} from '@figment-tezos/lib';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const {contractId, network, mnemonic, email, password, secret} =
    getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [hash, setHash] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [hash, setHash]);

  useEffect(() => {
    const getValue = async () => {
      setError(null);
      setFetching(true);
      setValue(null);
      try {
        const response = await axios.post(`/api/tezos/getter`, {
          contract: contractId,
          network,
          mnemonic,
          email,
          password,
          secret,
        });
        setValue(response.data);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setFetching(false);
      }
    };
    getValue();
  }, [hash, setHash]);

  const setCounter = async () => {
    setError(null);
    setResetting(true);
    setHash(null);
    try {
      const response = await axios.post(`/api/tezos/setter`, {
        contract: contractId,
        network,
        mnemonic,
        email,
        password,
        secret,
      });
      setHash(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setResetting(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Text strong>Current value stored in the contract:</Text>
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : (
          <Alert
            style={{fontWeight: 'bold', textAlign: 'center'}}
            type="success"
            message={value}
          />
        )}
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={setCounter}>
                Increment the stored value
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
                    View the transaction on Explorer
                  </a>
                }
                type="success"
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
    </Col>
  );
};

export default Setter;
