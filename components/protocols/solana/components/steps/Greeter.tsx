import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { accountExplorer, transactionExplorer } from "@solana/lib";
import axios from 'axios';
import { useAppState } from "@solana/hooks";

const { Text } = Typography;

const Greeter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  const { state, dispatch } = useAppState();

  const setGreeterAccount = () => {
    setError(null)
    setFetching(true)
		axios
			.post(`/api/solana/greeter`, state)
			.then(res => {
				setFetching(false)
          dispatch({
            type: 'SetGreeter',
            greeter: res.data.greeter
          })
          setHash(res.data.hash)
			})
			.catch(err => {
				const data = err.response.data
				setFetching(false)
        setHash(null)
				setError(data.message)
			})
  }

  if (state?.greeter) {
    return (
        <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
            <Space direction="vertical">
                <Text>Greeter account created</Text>
                <Alert 
                    message={
                        <a href={accountExplorer(state?.greeter ?? '')} target="_blank" rel="noreferrer">
                            View the account on Solana Explorer
                        </a>
                    }
                    type="success"
                    showIcon
                  />
                {hash && 
                    <Alert 
                        message={
                            <Text>
                                <a href={transactionExplorer(hash ?? '')} target="_blank" rel="noreferrer">
                                    View the transaction on Solana Explorer
                                </a>
                            </Text>
                        }
                        type="warning"
                        showIcon
                    />
                }
          </Space>
        </Col>
    )      
  }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>We&apos;re going to derive the greeter account from the programId</Text>
          <Input placeholder={state?.programId} disabled={true} style={{ width: "500px" }} />
          <Button type="primary" onClick={setGreeterAccount} loading={fetching}>Create Greeter</Button>
        </Space>
        {error && <Alert type="error" closable message={error} onClose={() => setError(null)} /> }
      </Space>
    </Col>
  );
}

export default Greeter
