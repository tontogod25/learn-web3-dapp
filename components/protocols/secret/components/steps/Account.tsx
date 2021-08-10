import { useEffect, useState } from 'react'
import { Alert, Button, Col, Space, Typography } from 'antd';
import { useAppState } from '@secret/hooks';
import axios from "axios";

const { Text } = Typography;

const Account = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [address, setAdress] = useState<string | null>(null)
	const { state, dispatch } = useAppState();

	useEffect( () => {
		if (state?.address) {
			setAdress(state.address)
		}
	}, [])

	const generateKeypair = async () => {
		try {
			setFetching(true)
			const response = await axios.get(`/api/secret/account`)
			const data = response.data
			console.log(data)
			const mnemonic = data.secret;
			const address = data.address;
            console.log(address)
			setAdress(address)
			dispatch({
				type: 'SetMnemonic',
				mnemonic: mnemonic
			})
			dispatch({
				type: 'SetAddress',
				address: address
			})
			setFetching(false)
		} catch (error) {
			console.error(error)
			setFetching(false)
		}
	}

	return (
		<Col>
		  <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }} loading={fetching}>
              Generate a Keypair
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
					  <Text>It's accessible (and copyable) at the top right of this page.</Text>
					</div>
				  }
				  type="success"
				  showIcon
				/>
				<Alert
				  message={
					<Space>
					  <Text strong>Fund your new account</Text>
					</Space>
				  }
				  description={
					<a href={`https://faucet.secrettestnet.io/`} target="_blank" rel="noreferrer">Go to the faucet</a>
				}
				  type="warning"
				  showIcon
				/>
			  </Space>
			</Col>
		  }
		</Col>
	  );
	}

export default Account

