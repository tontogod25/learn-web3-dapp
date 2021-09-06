import { Alert, Button, Col, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useAppState } from '@solana/hooks';
import axios from "axios";

const { Text } = Typography;

const Account = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [address, setAddress] = useState<string | null>(null)
	const { state, dispatch } = useAppState();

	useEffect( () => {
		if (state?.address) {
			setAddress(state.address)
		}
	}, [])

	const generateKeypair = async () => {
		try {
			setFetching(true)
			const response = await axios.get(`/api/solana/keypair`)
			setAddress(response.data.address)
			dispatch({
				type: "SetSecret",
				secret: response.data.secret,
			})
			dispatch({
				type: "SetAddress",
				address: response.data.address
			})
			setFetching(false)
		} catch (error) {
			console.error(error)
			setFetching(false)
		}
	}

	return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>
		<Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }} loading={fetching}>
              Generate Keypair
          </Button>
		  {address &&
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
					  <div>
						This is the string representation of the public key <br/>
						<Text code>{address}</Text>.
					  </div>
					  <Text>Accessible (and copyable) at the top right of this page.</Text>
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
