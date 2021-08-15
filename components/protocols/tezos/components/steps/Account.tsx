import { useState } from 'react'
import { Alert, Button, Col, Space, Typography, Input } from 'antd';
import { useAppState } from '@tezos/hooks';
import axios from "axios";

const { Text } = Typography;
const { TextArea } = Input;

type WalletT= {
	mnemonic: string[]
	secret: string
	amount: string
	pkh: string
	password: string
	email: string
}
const Account = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [wallet, setWallet] = useState<string>('')
	const { state, dispatch } = useAppState();
	const feedStorage = () => {
		try {
			const walletInfo: WalletT = JSON.parse(wallet)
			console.log(walletInfo.secret)
			dispatch({
				type: 'SetMnemonic',
				mnemonic: walletInfo.mnemonic.join(' ')
			})
			dispatch({
				type: 'SetAddress',
				address: walletInfo.pkh
			})
			dispatch({
				type: 'SetSecret',
				secret: walletInfo.secret
			})
			dispatch({
				type: 'SetPassword',
				password: walletInfo.password
			})
			dispatch({
				type: 'SetEmail',
				email: walletInfo.email
			})
		} catch(error) {
			console.error('Ill formed JSON')
		}
	}


	const createAccount = async () => {
		try {
			setFetching(true)
			const response = await axios.post(`/api/tezos/account`, state)
			setFetching(false)
		} catch (error) {
			console.error(error)
			setFetching(false)
		}
	}


	if (state?.secret) {
		return (
			<Col style={{ minHeight: '350px'}}>
				<Space direction="vertical">
					<Alert
						message={
						<Space>
							<Text strong>Wallet parsed</Text>

						</Space>
						}
						type="warning"
						showIcon
					/>
							<Button type="primary" onClick={createAccount} style={{ marginBottom: "20px" }}>
								Activate Account
							</Button>	
				</Space>
			</Col>
		)
	}

	return (
		<Col>
			<Space direction="vertical">
				<Alert
					message={
					<Space>
						<Text strong>
							<a href={`https://faucet.tzalpha.net/`} target="_blank" rel="noreferrer">
								Go to the faucet
							</a>
						</Text>
					</Space>
					}
					description={
					<Text>
						Copy and paste the json information into the text area below
					</Text>
				}
					type="warning"
					showIcon
				/>
				<TextArea rows={5} onChange={(event) => setWallet(event.target.value)}/>
				<Button type="primary" onClick={feedStorage} style={{ marginBottom: "20px" }}>
					Feed the storage
				</Button>
				{ state?.address && <Alert
					message={
					<Space>
						<Text strong><a href={`https://faucet.secrettestnet.io/`} target="_blank" rel="noreferrer">Look at the storage</a></Text>
					</Space>
					}
					description={
					<Text>
						Copy and paste the json information into the text area below
					</Text>
				}
					type="warning"
					showIcon
				/>}
		  	</Space>
		</Col>
	);
}

export default Account
