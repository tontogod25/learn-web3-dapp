import { useEffect, useState } from 'react';
import { Alert, Col, Button, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useAppState } from '@solana/hooks'
import { transactionExplorer } from '@solana/lib'

const { Text } = Typography;

const CallGreeting = () => {
    const [fetching, setFetching] = useState<boolean>(false)
    const [resetting, setResetting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [txhash, setTxhash] = useState<string>('')
    const [message, setMessage] = useState<number>(0)
    const { state } = useAppState()

    useEffect(() => {
        const getGreetings = () => {
            setError(null)
            setFetching(true)
            axios.post(`/api/solana/getGreetings`, state)
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
        getGreetings()
    }, [txhash, state])

    const callGreetings = () => {
        setError(null)
        setResetting(true)
        axios.post(`/api/solana/callGreetings`, state)
            .then(res => {
                setTxhash(res.data)
                setResetting(false)
            })
            .catch(err => {
                const data = err.response.data
                setResetting(false)
                setError(data.message)
            })
    }

    return (
    <>
        <Space direction="vertical" size="large">
          <Text>Number of greetings:</Text>
          <Col>
              {fetching
                  ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                  : <Alert style={{ fontWeight: "bold", textAlign: "center" }} type="success" closable={false} message={message} />
              }
          </Col>
          <Col>
              <Space direction="vertical" size="large">
                  <Space direction="horizontal">
                      <Button type="primary" onClick={callGreetings}>Send A Greeting</Button>
                  </Space>
                  {error && <Alert type="error" closable message={error} /> }
                  {resetting
                      ? <LoadingOutlined style={{ fontSize: 24 }} spin />
                      : txhash.length !== 0
                          ? <Alert
                              message={
                                  <Text strong>{`The greeting have been sent`}</Text>
                              }
                              description={
                                  <a href={transactionExplorer(txhash)} target="_blank" rel="noreferrer">
                                    View the transaction on Solana Explorer
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
        </Space>
    </>
    )
}

export default CallGreeting
