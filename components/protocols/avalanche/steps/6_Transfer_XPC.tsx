import { useState } from "react"
import axios from 'axios'
import { Form, Input, Button, Alert, Space, Typography } from 'antd'
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons'
import { Avalanche } from 'avalanche'

import { getAvalancheClient } from "utils/avalanche-utils"
import { getDatahubNodeURL } from "utils/datahub-utils"
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types'

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}
const tailLayout = {
	wrapperCol: { offset: 4, span: 20 },
}

const { Text } = Typography

const TransferXPC = ({ keypair }) => {
	const [toAddress, setToAddress] = useState(null)
	const [error, setError] = useState(null)
	const [fetching, setFetching] = useState(false)
	const [txSignature, setTxSignature] = useState(null)

	const generateKeypair = () => {
		const client = getAvalancheClient()
		const chain = client.XChain()
		const keyChain = chain.keyChain()
		const key = keyChain.makeKey()
		const address = key.getAddressString()
		setToAddress(address)
	}
	
	const transfer = (values) => {
		const amountNumber = parseFloat(values.amount)
		if (isNaN(amountNumber)) {
			setError("Amount needs to be a valid number")
		}

		setError(null)
		setTxSignature(null)
		setFetching(true)

		axios
			.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/transfer`,
				{
					from: keypair,
					to: toAddress,
					amount: amountNumber,
				}
			)
			.then(res => {
				console.log(res)
				setTxSignature("")
				setFetching(false)
			})
			.catch(err => {
				console.log(err)
				setTxSignature(null)
				setFetching(false)
				setError(null)
			})
		
	}

	const explorerUrl = process.env.NEXT_PUBLIC_AVALANCHE_TESTNET_EXPLORER_URL

	return (
		<Form
			{...layout}
			name="transfer"
			layout="horizontal"
			onFinish={transfer}
			initialValues={{
				from: keypair.getPublicKeyString
			}}
		> 
			<Form.Item label="Sender" name="from" required>
				<Text code>{keypair}</Text>
			</Form.Item>

			<Form.Item label="Amount" name="amount" required tooltip="1 AVAX = 0.00000000001 nAVAX">
				<Space direction="vertical">
					<Input suffix="AVAX" style={{ width: "200px" }} />
				</Space>
			</Form.Item>

			<Form.Item label="Recipient" required>
				<Space direction="horizontal">
					{toAddress && <Text code>{toAddress}</Text>}
					<Button size="small" type="dashed" onClick={generateKeypair} icon={<RedoOutlined />}>Generate an address</Button>
				</Space>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit" disabled={fetching}>
					Submit Transfer
				</Button>
			</Form.Item>

			{
				fetching &&
					<Form.Item {...tailLayout}>
						<Space size="large">
							<LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
							<Text type="secondary">Transfer initiated. Waiting for confirmations...</Text>
						</Space>
					</Form.Item>
			}

			{txSignature &&
				<Form.Item {...tailLayout}>
					<Alert
						type="success"
						showIcon
						message={
							<Text strong>Transfer confirmed!</Text>
						}
						description={
							<a href={explorerUrl} target="_blank" rel="noreferrer">View on Solana Explorer</a>
						}
					/>
				</Form.Item>
			}
			
			{error &&
				<Form.Item {...tailLayout}>
					<Alert
						type="error"
						showIcon
						closable
						message={error}
						onClose={() => setError(null)}
					/>
				</Form.Item>
			}
		</Form>
	)
}

export default TransferXPC
