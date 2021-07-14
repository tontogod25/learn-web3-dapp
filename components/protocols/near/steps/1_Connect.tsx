import { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, Col, Space, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { NearConnectReponse } from 'types/near-types';
import { useAppState } from '@near/hooks'

const { Text } = Typography;

const Connect = () => {
	const [version, setVersion] = useState<string>('');
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);
    const { state } = useAppState();

	useEffect(() => {
		getConnection();
	}, []);

    const getConnection = () => {
        setFetchingVersion(true)
        const { networkId } = state
		axios
			.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/connect`, { networkId })
			.then(res => {
				const version: NearConnectReponse = res.data
				setVersion(version)
				setFetchingVersion(false)
			})
			.catch(err => {
				console.error(err)
				setFetchingVersion(false)
			})
	}

	return (
		<Col style={{ width: "100%" }}>
			{fetchingVersion
				? <LoadingOutlined style={{ fontSize: 24 }} spin />
				: version.length != 0
					? <Alert
							message={
								<Space>
									Connected to Near!
									<Text code>{version}</Text>
								</Space>
							}
							type="success"
							showIcon
						/>
					: <Alert message="Not connected to Near" type="error" showIcon />}
		</Col>
	);
}

export default Connect
