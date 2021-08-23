/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Card, Button, Col, Row, InputNumber, Space, Typography, Statistic } from 'antd';
import { ethers } from 'ethers';
import { LoadingOutlined } from '@ant-design/icons';

// types
// import { BigNumberish } from "@ethersproject/bignumber";
// import { Bytes, BytesLike, Signature } from "@ethersproject/bytes";
// import { Transaction, UnsignedTransaction } from "@ethersproject/transactions";

import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json'
import { getPolygonTxExplorerURL } from 'utils/polygon-utils';

const { Text } = Typography

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const Call = () => {
  const [inputNumber, setInputNumber] = useState<number>(0)
	const [fetchingGet, setFetchingGet] = useState<boolean>(false)
	const [fetchingSet, setFetchingSet] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string | null>(null)
	const [contractNumber, setContractNumber] = useState<string | null>(null)
	const [confirming, setConfirming] = useState<boolean>(false)

	const getValue = () => {
		setFetchingGet(true)
	
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const contract = new ethers.Contract(
			SimpleStorageJson.networks['80001'].address,
			SimpleStorageJson.abi,
			provider
		)

		// contract.methods.get().call().then((res: any) => console.log("yay", res))
		contract.get()
			.then((res: any) => {
				console.log('coucou', res.toString())
				setContractNumber(res.toString())
			})
			.catch((err: any) => {
				console.log(err)
			})
			.finally(() => {
				setFetchingGet(false)
			})
	  }
	
	const setValue = () => {
		setFetchingSet(true)
		setTxHash(null)
	
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = new ethers.Contract(
			SimpleStorageJson.networks['80001'].address,
			SimpleStorageJson.abi,
			signer
		)
	
		contract.set(inputNumber)
			.then((txRes: any) => {
				setFetchingSet(false)
				setInputNumber(0)
				setConfirming(true)
				txRes.wait()
					.then((txReceipt: any) => {
						console.log("txReceipt", txReceipt)
						setTxHash(txReceipt.transactionHash)
					})
					.catch((txError: any) => {
						console.log("txError", txError)
					})
					.finally(() => {
						setConfirming(false)
					})
			})
			.catch((err: any) => {
				console.log(err)
				setFetchingSet(false)
			})
	 }

  return (
    <Col style={{ minHeight: '350px', maxWidth: '600px'}}>
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Set Value">
						<Space direction="vertical">
							<InputNumber value={inputNumber} onChange={setInputNumber} />
							<Button type="primary" onClick={setValue}>Set Value</Button>
							{
								fetchingSet &&
									<Space direction="horizontal">
										<LoadingOutlined style={{ fontSize: 24 }} spin />
										{'Sending transaction...'}
									</Space>
							}
							{
								confirming &&
									<Space direction="horizontal">
										<LoadingOutlined style={{ fontSize: 24 }} spin />
										{'Waiting for transaction confirmation...'}
									</Space>
							}
							{
								txHash &&
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
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Get Value">
						<Space direction="vertical">
							{!fetchingGet && <Statistic value={contractNumber as string} />}
							{fetchingGet && <LoadingOutlined style={{ fontSize: 24 }} spin />}
							<Button type="primary" onClick={getValue}>Get Value</Button>
						</Space>
					</Card>
				</Col>
			</Row>
		</Col>
	);
}

export default Call
