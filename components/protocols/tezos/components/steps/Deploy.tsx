import { useState } from 'react'
import axios from 'axios'
import { Alert, Col, Input, Button, Space, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppState } from '@tezos/hooks'
import { transactionUrl } from '@tezos/lib'

const { Text } = Typography

const Deploy = () => {
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [txhash, setTxhash] = useState<string>('')
    const { state, dispatch } = useAppState()

    const deployContract = () => {
        setError(null)
        setFetching(true)
        axios.post(`/api/tezos/deploy`, state)
            .then(res => {
                const hash = res.data.hash 
                const addr = res.data.contractAddress 
                console.log(hash, addr)
                setTxhash(hash)
                setFetching(false)
                dispatch({
                    type: 'SetContractAddress',
                    contractAddress: addr
                })
				
            })
            .catch(err => {
                const data = err.response.data
                setFetching(false)
                setError(data)
            })
    }

    return (
		<Col style={{ minHeight: '350px'}}>
            <Space direction="vertical" size="large">
                <Space direction="horizontal">
                    <Button type="primary" onClick={deployContract}>Deploy the contract</Button>
                    <Input 
                        style={{ minWidth: "200px", fontWeight: "bold", textAlign: "center" }} 
                        disabled={true}  
                        defaultValue={'counter'} 
                    />
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
                                <a href={transactionUrl(txhash)} target="_blank" rel="noreferrer">
                                    View the transaction on Tezos Explorer
                                </a>
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
