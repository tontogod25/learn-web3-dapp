import {useState, useEffect} from 'react';
import axios from 'axios';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';

import {PROTOCOL_INNER_STATES_ID} from 'types';

import {transactionUrl} from '@figment-secret/lib';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const {mnemonic, network} = getInnerState(state);

  const [hash, setHash] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address && hash) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.CONTRACT_ID]: address,
          },
        ],
        isCompleted: true,
      });
    }
  }, [address, hash, setHash, setAddress]);

  const deployContract = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.post(`/api/secret/deploy`, {mnemonic});
      setAddress(response.data.contractAddress);
      setHash(response.data.transactionHash);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <Button type="primary" onClick={deployContract} loading={fetching}>
            Deploy the contract
          </Button>
          <Input
            style={{
              minWidth: '200px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={true}
            defaultValue={'simplecounter'}
          />
        </Space>
        {hash && address ? (
          <Alert
            message={
              <Space direction="vertical">
                <Text strong>The contract has been deployed!</Text>
              </Space>
            }
            description={
              <a href={transactionUrl(hash)} target="_blank" rel="noreferrer">
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
  );
};

export default Deploy;
