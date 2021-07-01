import { useState } from "react";
import { Alert, Button, Space, Col, Input, Typography } from 'antd';
import axios from 'axios';

import { QueryResponseData } from "types/response-types"

const { Text } = Typography;
const { TextArea } = Input;

const Query = () => {
	const [queryData, setQueryData] = useState<QueryResponseData>(null);

	const getQuery = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/query`)
			.then(res => {
				const data: QueryResponseData = res.data
				console.log(typeof data)
				setQueryData(data)
			})
	}
		
	return (
		<Col>
			<Space direction="vertical" size="large">
				<Space direction="vertical">
					<Text>We can query information from Avalanche using the InfoAPI</Text>
					<pre>
						{JSON.stringify(queryData, null, 2)}
					</pre>
					<Button type="primary" onClick={getQuery}>Query the network</Button>
				</Space>
			</Space>
		</Col>
	);
}

export default Query