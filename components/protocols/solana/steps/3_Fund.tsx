import { useState } from "react"
import { Alert, Button, Space, Col, Input, Typography } from 'antd'
import axios from "axios"
import { SolanaFundResponse, SolanaTransferErrorResponse } from "types/solana-types"

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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/fund`,
        {
					address: value,
				},
      )
			.then(res => {
				const data: SolanaFundResponse = res.data
        console.log(`data`, data)
				setIsFunded(true)
				setFetching(false)
			})
			.catch(err => {
				console.log(`err.response`, err.response)
				const data: SolanaTransferErrorResponse = err.response.data
				setFetching(false)
				setError(data.message)
			})
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated (you can copy it in the top right corner of the page):</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={fund}>Fund this address</Button>
        </Space>
        {error &&
          <Alert
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError(null)}
          />
        }
        {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" showIcon />}
      </Space>
    </Col>
  )
}

export default Fund