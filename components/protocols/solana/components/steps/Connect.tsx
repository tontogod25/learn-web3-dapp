import { LoadingOutlined } from '@ant-design/icons';
import { Col, Alert, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppState } from '@solana/hooks'

const { Text } = Typography;

const Connect = () => {
  	const [version, setVersion] = useState<string | null>(null);
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);
	const { dispatch } = useAppState();

	useEffect(() => {
		getConnection();
	}, []);

	const getConnection = () => {
		setFetchingVersion(true)
		axios
			.get(`/api/solana/connect`)
			.then(res => {
				const version = res.data
				setVersion(version)
				setFetchingVersion(false)
				dispatch({
					type: "SetNetworkId",
					networkId: res.data
				})
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
