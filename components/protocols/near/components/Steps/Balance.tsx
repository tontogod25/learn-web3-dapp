import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppState } from '@near/hooks'
import { getAccountUrl } from '@near/lib'

const { Text } = Typography;

const DECIMAL_OFFSET = 10**24;

const Balance = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const { state } = useAppState();
    const { networkId, accountId } = state;

    const getBalance = () => {
        setError(null)
        setFetching(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/balance`, { networkId, accountId })
            .then(res => {
                const data = res.data
                const intoNear = (parseFloat(data.total) / DECIMAL_OFFSET).toFixed();
                setBalance(parseFloat(intoNear))
                setFetching(false)
            })
            .catch(err => {
                const data = err.response.data
                setFetching(false)
                setBalance(0)
                setError(data.message)
            })
    }

    const explorerUrl = getAccountUrl(networkId)(accountId as string);

    return (
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below the <span style={{ fontWeight: "bold" }}>account Id</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} disabled={true}  defaultValue={accountId} />
                    <Button type="primary" onClick={getBalance}>Check Balance</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : balance != 0
                        ? <Alert
                            message={
                                <Text strong>{`This address has a balance of ${balance} NEAR`}</Text>
                            }
                            description={
                                <a href={explorerUrl} target="_blank" rel="noreferrer">View the address on Solana Explorer</a>
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
