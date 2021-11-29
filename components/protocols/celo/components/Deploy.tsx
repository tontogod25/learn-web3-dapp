import {useState, useEffect} from 'react';
import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import axios from 'axios';

import {PROTOCOL_INNER_STATES_ID} from 'types';
import {transactionUrl} from '@figment-celo/lib';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const {secret, address, network} = getInnerState(state);

  const [contract, setContract] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contract) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.CONTRACT_ID]: contract,
          },
        ],
        isCompleted: true,
      });
    }
  }, [contract, setContract]);

  const deployContract = async () => {
    try {
      setFetching(true);
      setContract(null);
      setHash(null);
      setError(null);
      const response = await axios.post(`/api/celo/deploy`, {
        secret,
        address,
        network,
      });
      setContract(response.data.address);
      setHash(response.data.hash);
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
            defaultValue={'Hello World'}
          />
        </Space>
        {hash && contract ? (
          <Alert
            style={{maxWidth: '550px'}}
            type="success"
            showIcon
            message={<Text strong>{`The contract has been deployed!`}</Text>}
            description={
              <a href={transactionUrl(hash)} target="_blank" rel="noreferrer">
                View transaction on Explorer
              </a>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Alert message="Please Complete the code" type="error" showIcon />
        )}
      </Space>
    </Col>
  );
};

export default Deploy;
