import { useEffect, useState } from 'react';
import { Alert, Col, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppState } from '@near/hooks';
import axios from 'axios';

const { Text } = Typography

const Connect = () => {
	const [version, setVersion] = useState<string | null>(null)
	const [fetching, setFetching] = useState<boolean>(false)
    const { state } = useAppState()

	useEffect(() => {
		getConnection()
	}, []);

    const getConnection = async () => {
        setFetching(true)
		try {
			const response = await axios.post(`/api/near/connect`, state)
			const version = response.data
			setVersion(version)	
		} catch(error) {
			console.error(error)
		} finally {
			setFetching(false)
		}
	}

	return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>	
			<LoadingOutlined style={{ fontSize: 24 }} spin hidden={!fetching} />
				{version
				? <Alert message={<Text strong>connected to Near! <Text code>{version}</Text></Text>} type="success" showIcon />
                : <Alert message={`Not connected to Near`} type="error" showIcon />}
		</Col>
	)
}

export default Connect
