import { useState } from "react"
import { Alert, Button, Space, Col, Input, Typography } from 'antd'
import axios from "axios"

const { Text } = Typography

const Fund = () => {
  const [value, setValue] = useState<string | null>("")
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFunded, setIsFunded] = useState<boolean>(false)

  const fund = () => {
    if (!value) return null

    setFetching(true)
		axios
			.post(
        `/api/solana/fund`,
        {
					address: value,
				},
      )
			.then(res => {
				const data = res.data
        console.log(`data`, data)
				setIsFunded(true)
				setFetching(false)
			})
			.catch(err => {
				console.error(err)
				setFetching(false)
				setError('unable to do the transfer')
			})
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated (you can copy it in the top right corner of the page):</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={fund} loading={fetching}>Fund this address</Button>
        </Space>
          {error && <Alert type="error" showIcon closable message={error} onClose={() => setError(null)} />}
          {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" closable showIcon />}
      </Space>
    </Col>
  )
}

export default Fund
