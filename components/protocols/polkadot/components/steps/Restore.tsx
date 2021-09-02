import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppState } from '@polka/hooks'
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const Restore = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const { state, dispatch } = useAppState();

    const getBalance = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/polkadot/restore`, { ...state, memo })
            .then(res => {
                setAddress(res.data)
                dispatch({
                    type: "SetMnemonic",
                    mnemonic: memo
                })
                dispatch({
                    type: "SetAddress",
                    address: res.data
                })
                setFetching(false)
            })
            .catch(error => {
                console.log(error.data)
                setAddress('')
                setError(error.data)
                setFetching(false)
            })
    }

    return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below paste the <span style={{ fontWeight: "bold" }}>mnemonic</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} onChange={(e) => setMemo(e.target.value)} />
                    <Button type="primary" onClick={getBalance}>Restore Account</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : address.length != 0
                        ? <Alert
                            message={
                                <Text strong>{`This is the restored account address: ${address}`}</Text>
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

export default Restore
