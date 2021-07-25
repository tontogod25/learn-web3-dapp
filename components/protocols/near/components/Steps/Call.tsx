import { useEffect, useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppState } from '@near/hooks'
import { getTransactionUrl } from '@near/lib'

const { Text } = Typography;

const Call = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [reseting, setResiting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [txhash, setTxhash] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const { state } = useAppState();

    useEffect(() => {
        const contractCallView = () => {
            setError(null)
            setFetching(true)
            axios.post(`/api/near/callView`, state)
                .then(res => {
                    setMessage(res.data)
                    setFetching(false)
                })
                .catch(err => {
                    const data = err.response.data
                    setFetching(false)
                    setError(data.message)
                })
        }
        contractCallView();
    }, [txhash, state])

    const contractCallFunction = () => {
        setError(null)
        setResiting(true)
        axios.post(`/api/near/callFunction`, { ...state, newMessage })
            .then(res => {
                setTxhash(res.data)
                setResiting(false)
            })
            .catch(err => {
                const data = err.response.data
                setResiting(false)
                setError(data.message)
            })
    }

    const txUrl = getTransactionUrl(state.networkId)(txhash);

    return (
    <>
        <Space direction="vertical" size="large">
        <Text>Below the message stored on contract:</Text>
        <Col>
            {fetching
                ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                : <Alert style={{ fontWeight: "bold", textAlign: "center" }} type="success" closable={false} message={message} />
            }
        </Col>
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="horizontal">
                    <Button type="primary" onClick={contractCallFunction}>Reset the message</Button>
                    <Input style={{ minWidth: "200px", fontWeight: "bold", textAlign: "center" }} defaultValue={message} onChange={ e => setNewMessage(e.target.value) }/>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {reseting
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : txhash.length !== 0
                        ? <Alert
                            message={
                                <Text strong>{`The message has been reset`}</Text>
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
        </Space>
    </>
    );
}

export default Call
