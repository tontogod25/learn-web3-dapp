import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppState } from '@polka/hooks'

const { Text } = Typography;

const Restore = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string>('');
    const { state } = useAppState();

    const getBalance = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/polkadot/restore`, state)
            .then(res => {
                setAddress(res.data.address)
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
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="vertical">
                    <Text>Below the <span style={{ fontWeight: "bold" }}>mnemonic</span> you generated previously:</Text>
                    <Input style={{ width: "500px", fontWeight: "bold" }} disabled={true}  defaultValue={state?.mnemonic} />
                    <Button type="primary" onClick={getBalance}>Restore Account</Button>
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : address.length != 0
                        ? <Alert
                            message={
                                <Text strong>{`This is the restored address ${address}`}</Text>
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
