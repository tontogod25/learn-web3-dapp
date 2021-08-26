import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppState } from '@secret/hooks'

const { Text } = Typography;

const DECIMAL_OFFSET = 10**6;

const Balance = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const { state } = useAppState();

    const getBalance = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/secret/balance`, state)
            .then(res => {
                const amount = res.data
                const intoSCRT = (amount / DECIMAL_OFFSET).toFixed();
                setBalance(parseFloat(intoSCRT))
                setFetching(false)
            })
            .catch(err => {
                const data = err.data
                console.log(err)
                setFetching(false)
                setBalance(0)
                setError(data)
            })
    }

    return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>	
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below the <span style={{ fontWeight: "bold" }}>address</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} disabled={true}  defaultValue={state?.address} />
                    <Button type="primary" onClick={getBalance}>Check Balance</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : balance != 0
                        ? <Alert
                            message={
                                <Text strong>{`This address has a balance of ${balance} SCRT`}</Text>
                            }
                            type="success"
                            closable
                            showIcon
                        />
                    : null
                }
            </Space>
        </Col>
    );
}

export default Balance
