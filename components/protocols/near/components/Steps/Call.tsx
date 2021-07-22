import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppState } from '@near/hooks'
import { getTransactionUrl } from '@near/lib'

const { Text } = Typography;

const Call = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [txhash, setTxhash] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const { state } = useAppState();
    const { networkId, accountId, secretKey } = state;

    const contractCallFunction = () => {
        setError(null)
        setFetching(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/callFunction`, { networkId, accountId, secretKey })
            .then(res => {
                // to complet
                setTxhash(res.data)
                setFetching(false)
            })
            .catch(err => {
                const data = err.response.data
                setFetching(false)
                setError(data.message)
            })
    }

    const contractCallView = () => {
        setError(null)
        setFetching(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/callView`, { networkId, accountId, secretKey })
            .then(res => {
                // to complet
                setMessage(res.data)
                setFetching(false)
            })
            .catch(err => {
                const data = err.response.data
                setFetching(false)
                setError(data.message)
            })
    }


    const txUrl = getTransactionUrl(networkId)(txhash);

    return (
    <>
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below the <span style={{ fontWeight: "bold" }}>account Id</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} disabled={true}  defaultValue={accountId} />
                    <Button type="primary" onClick={contractCallView}>Check Balance</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : txhash.length !== 0
                        ? <Alert
                            message={
                                <Text strong>{`Function successfully called`}</Text>
                            }
                            description={
                                <a href={txUrl} target="_blank" rel="noreferrer">View the transaction on NEAR Explorer</a>
                            }
                            type="success"
                            closable
                            showIcon
                        />
                    : null
                }
            </Space>
            </Col>
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below the <span style={{ fontWeight: "bold" }}>account Id</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} disabled={true}  defaultValue={accountId} />
                    <Button type="primary" onClick={contractCallFunction}>Check Balance</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : message.length !== 0
                        ? <Alert
                            message={
                                <Text strong>{`View successfully called`}</Text>
                            }
                            description={
                                <Text strong>{`Message stored on the contract: ${message}`}</Text>
                            }
                            type="success"
                            closable
                            showIcon
                        />
                    : null
                }
            </Space>
        </Col>
    </>
    );
}

export default Call
