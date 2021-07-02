import { LoadingOutlined } from '@ant-design/icons';
import { Version } from '@solana/web3.js';
import { Col, Alert, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { SolanaConnectReponse } from "types/solana-types"

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState<string | null>(null);
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);

	useEffect(() => {
		getConnection();
	}, []);

	const getConnection = () => {
		setFetchingVersion(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solana/connect`)
			.then(res => {
				const version: SolanaConnectReponse = res.data
				setVersion(version["solana-core"])
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
							Connected to Solana
							<Text code>v{version}</Text>
						</Space>
					}
					type="success"
					showIcon
				/> : <Alert message="Not connected to Solana" type="error" showIcon />}
    </Col>
  );
}

export default Connect