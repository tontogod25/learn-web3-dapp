import { useEffect, useState } from 'react'
import axios from "axios"
import { Alert, Col, Space, Typography } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import { PolkadotConnectReponse } from "types/polkadot-types"

const { Text } = Typography

const Connect = () => {
  const [version, setVersion] = useState<PolkadotConnectReponse | null>(null)
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false)

  useEffect(() => {
    getConnection()
  }, [])

  const getConnection = () => {
    setFetchingVersion(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polkadot/connect`)
			.then(res => {
				const info: PolkadotConnectReponse = res.data
				setVersion(info)
				setFetchingVersion(false)
			})
			.catch(err => {
				console.log(err)
				setFetchingVersion(false)
			})
  }

  return (
		<Col style={{ width: "100%" }}>
			{fetchingVersion
				? <LoadingOutlined style={{ fontSize: 24 }} spin />
				: version
					? <Alert
						message={
							<Space>
								Connected to Polkadot!
								<Text code>{version}</Text>
							</Space>
						}
						type="success"
						showIcon
					/>
					: <Alert message="Not connected to Polkadot" type="error" showIcon />}
		</Col>
	)
}

export default Connect