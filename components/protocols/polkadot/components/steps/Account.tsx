import { useEffect, useState } from 'react'
import { Alert, Button, Col, Space, Typography } from 'antd';
import { useAppState } from '@polka/hooks';
import axios from "axios";

const { Text } = Typography;

const FAUCET_ADDR = `https://app.element.io/#/room/#westend_faucet:matrix.org`

type downloadBoxT = {
    jsonWallet: string,
    address: string
}
const DownloadBox = ({ jsonWallet, address }: downloadBoxT) => {
	const fileName = address;	
    return (
        <Button>
            <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    jsonWallet
                )}`}
                download={`polkadot-${fileName}.json`}
            >
                {`Download Json`}
            </a>
        </Button>
    )
}

const Account = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [address, setAdress] = useState<string | null>(null)
	const [jsonWallet, setJsonWallet] = useState<string>('')
	const { state, dispatch } = useAppState();

	useEffect( () => {
		/*
		const fromMnemonic = () => {
			setFetching(true)
			axios
				.post(`/api/polkadot/fromMnemonic`, state)
				.then(res => {
					setAdress(res.data.address)
					setJsonWallet(res.data.jsonWallet)
					dispatch({
						type: 'SetAddress',
						address: res.data.address
					})			
					setFetching(false)
				})
				.catch(err => {
					console.error(err)
					setFetching(false)
				})
		}
		if (state?.mnemonic) {
			fromMnemonic();
		}
		*/
		if (state?.address) {
			setAdress(state.address)
		}
	}, [])

	const generateKeypair = async () => {
		try {
			setFetching(true)
			const response = await axios.get(`/api/polkadot/account`)
			const mnemonic = response.data.mnemonic;
			const address = response.data.address;
			const jsonWallet = response.data.jsonWallet;
			setAdress(address)
			setJsonWallet(jsonWallet)
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
						<Text code style={{ fontWeight: 'bold' }}>{address}</Text>.
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
					<div>
						<a href={FAUCET_ADDR} target="_blank" rel="noreferrer">
							Go to the faucet, connect and enter
						</a>
						<br />
						<Text code style={{ fontWeight: 'bold' }}>!drip ${address}</Text>
					</div>
				}
				  type="warning"
				  showIcon
				/>
			  {state?.address && <DownloadBox jsonWallet={jsonWallet} address={state.address} /> }	
			  </Space>
			</Col>
		  }
		</Col>
	  );
	}

export default Account
