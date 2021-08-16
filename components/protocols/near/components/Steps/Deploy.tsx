import { useState } from 'react'
import axios from 'axios'
import { Alert, Col, Input, Button, Space, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppState } from '@near/hooks'
import { getTransactionUrl } from '@near/lib'

const { Text } = Typography

const Deploy = () => {
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [txhash, setTxhash] = useState<string>('')
    const { state } = useAppState()
    const { networkId, accountId, secretKey } = state

    const deployContract = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/near/deploy`, { networkId, accountId, secretKey })
            .then(res => {
                setTxhash(res.data)
                setFetching(false)
            })
            .catch(err => {
                const data = err.response.data
                setFetching(false)
                setError(data)
            })
    }

    const txUrl = getTransactionUrl(networkId)(txhash)

    return (
        <Col>
            <Space direction="vertical" size="large">
                <Space direction="horizontal">
                    <Button type="primary" onClick={deployContract}>Deploy the contract</Button>
                    <Input style={{ minWidth: "200px", fontWeight: "bold", textAlign: "center" }} disabled={true}  defaultValue={accountId} />
                </Space>
                {error && <Alert type="error" closable message={error} /> }
                {fetching
                    ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                    : txhash.length !== 0
                        ? <Alert
                            message={
                                <Text strong>{`The contract has been deployed!`}</Text>
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
    )
}

export default Deploy
