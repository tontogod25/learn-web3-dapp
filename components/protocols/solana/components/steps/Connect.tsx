import { LoadingOutlined } from '@ant-design/icons';
import { Col, Alert, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const { Text } = Typography;

const Connect = () => {
  	const [version, setVersion] = useState<string | null>(null);
	const [fetching, setFetching] = useState<boolean>(false);

	useEffect(() => {
		getConnection();
	}, []);

	const getConnection = () => {
		setFetching(true)
		axios
			.get(`/api/solana/connect`)
			.then(res => {
				const version = res.data
				setVersion(version)
				setFetching(false)
			})
			.catch(err => {
				console.log(err)
				setFetching(false)
			})
	}

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
		{fetching
			? <LoadingOutlined style={{ fontSize: 24 }} spin />
			: version
				? <Alert
				message={
					<Space>
						Connected to Solana: 
						<Text code>version {version}</Text>
					</Space>
				}
				type="success"
				showIcon
			/> : <Alert message="Not connected to Solana" type="error" showIcon />
		}
    </Col>
  );
}

export default Connect
