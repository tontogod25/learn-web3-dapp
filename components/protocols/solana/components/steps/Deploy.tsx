import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { accountExplorer } from "@solana/lib";
import { useAppState } from '@solana/hooks';
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const Deploy = () => {
  const [value, setValue] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const { state, dispatch } = useAppState();

  const checkProgramId = () => {
    setError(null)
    setFetching(true)
		axios
			.post(`/api/solana/checkProgram`, { ...state, programId: value })
			.then(res => {
        const result: boolean = res.data
        dispatch({
          type: 'SetProgramId',
          programId: value as string
        })
        setChecked(res.data)
				setFetching(false)
			})
			.catch(res => {
				setFetching(false)
        setChecked(false)
				setError('Unable to check ProgramId')
			})
  }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the <Text strong>programId</Text> generated after the deployment:</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={checkProgramId} loading={fetching}>Check ProgramId</Button>
        </Space>
        {error && <Alert type="error" closable message={error} onClose={() => setError(null)} /> }
        {checked && <Alert 
                message={
                  <Text strong>{`The program is correctly deployed`}</Text>
                }
                description={
                  <a href={accountExplorer(state?.programId ?? '', state.network)} target="_blank" rel="noreferrer">
                    View the program on Solana Explorer
                  </a>
                }
                type="success"
                closable
                showIcon
              />
        }
      </Space>
    </Col>
  );
}

export default Deploy
