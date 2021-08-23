/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Card, Button, Col, InputNumber, Space, Typography } from 'antd';
import { ethers } from 'ethers';
import { LoadingOutlined } from '@ant-design/icons';

import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json'
import { getPolygonTxExplorerURL } from 'utils/polygon-utils';

const { Text } = Typography

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const SetStorage = () => {
	const [inputNumber, setInputNumber] = useState<number>(0)
	const [fetchingSet, setFetchingSet] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string | null>(null)
	const [confirming, setConfirming] = useState<boolean>(false)

	const setValue = async () => {
		setFetchingSet(true)
		setTxHash(null)
	
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = new ethers.Contract(
			SimpleStorageJson.networks['80001'].address,
			SimpleStorageJson.abi,
			signer
		)
		try {
			const transactionResult = await contract.set(inputNumber)
			setFetchingSet(false)
			setInputNumber(0)
			setConfirming(true)
			const receipt = await transactionResult.wait()
			setTxHash(receipt.transactionHash)
			setConfirming(false)
		} catch(error) {
			console.log(error)
			setFetchingSet(false)
		}
	}

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
		<Space direction="vertical" size="large">
			<Space direction="horizontal">
				<InputNumber value={inputNumber} onChange={setInputNumber} />
				<Button type="primary" onClick={setValue}>Set Value</Button>
			</Space>
			{ fetchingSet &&
				<Space direction="horizontal">
					<LoadingOutlined style={{ fontSize: 24 }} spin />
					{'Sending transaction...'}
				</Space>
			}
			{ confirming &&
				<Space direction="horizontal">
					<LoadingOutlined style={{ fontSize: 24 }} spin />
					{'Waiting for transaction confirmation...'}
				</Space>
			}
			{ txHash &&
				<Alert
					showIcon
					type="success"
					message={
						<Text strong>Transaction confirmed!</Text>
					}
					description={
						<a href={getPolygonTxExplorerURL(txHash)} target="_blank" rel="noreferrer">View on Polyscan</a>
					}
				/>
			}
		</Space>
	</Col>
	);
}

export default SetStorage
