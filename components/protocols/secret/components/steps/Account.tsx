import { useEffect, useState } from 'react'
import { Alert, Button, Col, Space, Typography } from 'antd';
import { useAppState } from '@secret/hooks';
import axios from "axios";
import { mnemonic } from 'avalanche/dist/utils';

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
			const mnemonic = response.data.mnemonic;
			const address = response.data.address;
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
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>	
		  <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }} loading={fetching}>
              Generate a Mnemonic
          </Button>
		  {address &&
			<Col>
			  <Space direction="vertical">
				<Alert
				  message={
					<Space>
					  <Text strong>Mnemonic generated!</Text>
					</Space>
				  }
				  description={
					<div>
						Your generated Address: <br/>
						<Text strong mark>{address}</Text>
						<br/>
						Your generated Mnemonic: <br/>
						<Text  code strong>{mnemonic.slice(0,24)} ... {mnemonic.slice(-24)}</Text>
					</div>
				  }
				  type="success"
				  showIcon
				/>
				<Alert
				  message={
					<Text strong>Accessible (and copyable) at the top right of this page.</Text>
				}
				  type="info"
				  showIcon
				/>
				<Alert
				  message={
						<a href={`https://faucet.secrettestnet.io/`} target="_blank" rel="noreferrer">Fund your new account</a>
				  }
				  type="error"
				  showIcon
				/>
			  </Space>
			</Col>
		  }
		</Col>
	  );
	}

export default Account

