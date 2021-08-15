import { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, Col, Space, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useAppState } from 'components/protocols/tezos/hooks'

const { Text } = Typography;

const Connect = () => {
	const [chainId, setChainId] = useState<string | null>(null);
	const [fetching, setFetching] = useState<boolean>(false);

	useEffect(() => {
		const getConnection = () => {
			setFetching(true)
			axios
				.get(`/api/tezos/connect`)
				.then(res => {
					setChainId(res.data)
					setFetching(false)

				})
				.catch(err => {
					console.error(err)
					setFetching(false)
				})
		}
		getConnection()
    }, []);

	return (
		<Col style={{ minHeight: '350px'}}>
			{fetching
				? <LoadingOutlined style={{ fontSize: 24 }} spin />
				: chainId
					? <Alert
							message={
								<Space>
									Connected to Tezos! Chain Id: 
									<Text code>{chainId}</Text>
								</Space>
							}
							type="success"
							showIcon
						/>
					: <Alert message="Not connected to Tezos" type="error" showIcon />}
		</Col>
	);
}

export default Connect