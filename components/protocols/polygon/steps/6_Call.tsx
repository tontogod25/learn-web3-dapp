/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';
import axios from 'axios';
import styled from 'styled-components';

import { PolygonAccountT, PolygonQueryResponse, PolygonQueryErrorResponse } from 'types/polygon-types';

const { Text } = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

import { LoadingOutlined } from '@ant-design/icons';

const Call = ({ account }: { account: PolygonAccountT }) => {
  const [queryData, setQueryData] = useState<PolygonQueryResponse | null>(null)
	const [fetching, setFetching] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const getValue = () => {
		setFetching(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon/get`)
			.then(res => {
				const data = res.data
				setQueryData(data)
				setFetching(false)
			})
			.catch(err => {
				console.log(err)
				setFetching(false)
			})
  }

	const setValue = () => {
		setFetching(true)
		axios
			.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon/set`,
				{
					amount: 20
				}
			)
			.then(res => {
				const data = res.data
				setQueryData(data)
				setFetching(false)
			})
			.catch(err => {
				console.log(err)
				setFetching(false)
			})
  }

  return (
		<Col>
			<Space direction="vertical" size="large">
				<Space direction="vertical">
					<Button type="primary" onClick={setValue}>Set Value</Button>
					<Button type="primary" onClick={getValue}>Get Value</Button>
				</Space>
			</Space>
		</Col>
	);
}

export default Call