import { Col, Alert, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useAppState } from '@solana/hooks';
import axios from 'axios';

const { Text } = Typography;

const Connect = () => {
	const [version, setVersion] = useState<string | null>(null);
	const [fetching, setFetching] = useState<boolean>(false);
	const { state } = useAppState();

	useEffect(() => {
		getConnection();
	}, [state.network]);

	const getConnection = () => {
		setFetching(true)
		axios
			.post(`/api/solana/connect`, state)
			.then(res => {
				setVersion(res.data)
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
