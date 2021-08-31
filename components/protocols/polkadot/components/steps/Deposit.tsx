import { Alert, Col, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppState } from '@polka/hooks'
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const DECIMAL_OFFSET = 10**9;

const Deposit = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deposit, setDeposit] = useState<number>(0);
    const { state } = useAppState();

    const getDeposit = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/polkadot/deposit`, state)
            .then(res => {
                const amount = res.data
                const intoGigaPlanck = (amount / DECIMAL_OFFSET).toFixed();
                setDeposit(parseFloat(intoGigaPlanck));           
                setFetching(false);
            })
            .catch(err => {
                const data = err.data
                console.log(err)
                setFetching(false)
                setDeposit(0)
                setError(data)
            })
    }

    return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Button type="primary" onClick={getDeposit}>Get Existential deposit!</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : deposit != 0
                        ? <Alert
                            message={
                                <Text strong>{`Existential deposit: ${deposit} gigaPlanck`}</Text>
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

export default Deposit
