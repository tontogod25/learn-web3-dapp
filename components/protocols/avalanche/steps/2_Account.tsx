import { useEffect, useState } from 'react'
import { Alert, Button, Col, Space, Typography } from 'antd';
import axios from 'axios'

import { KeypairData } from "types/response-types"

const { Text, Paragraph } = Typography;

const Account = ({
	keypair,
	setKeypair
}: { 
	keypair: KeypairData,
	setKeypair: (keypair: KeypairData) => void
}) => {

	// useEffect(() => {
	// 	generateKeypair();
	// }, []);

	const generateKeypair = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/account`)
			.then(res => {
				const data: KeypairData = res.data
				setKeypair(data)
			})
	}

	const publicKeyStr = keypair ? keypair.addressString : null

	return (
		<Col>
			<Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>Generate a Keypair</Button>
			{keypair &&
				<Col>
					<Space direction="vertical">
						<Alert
							message={
								<Space>
									<Text strong>Keypair generated!</Text>
								</Space>
							}
							description={
								<div>
									<Text>Open the JS console to inspect the Keypair.</Text>
									<div>
										This is the string representation of the keypair address :
										<Text code>{publicKeyStr}</Text>.
									</div>
									<Text>It is accessible (and copyable) at the top right of this page.</Text>
								</div>
							}
							type="success"
							showIcon
						/>
					</Space>
				</Col>
			}
		</Col>
	);
}

export default Account