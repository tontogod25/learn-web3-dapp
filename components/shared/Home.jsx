import React from "react";
import Link from "next/link";
import { Col } from 'antd';
import styled from "styled-components";
import { CHAINS } from "./constants";

const Home = () => {
	return (
		<Container span={12} offset={6} align="center">
			<Title>Figment Learn - All Pathways</Title>
			<ChainRow gutter={[16, 24]}>
				{
					Object.keys(CHAINS).map(chain => {
						const { id, active, logoUrl } = CHAINS[chain];
						const label = id.charAt(0).toUpperCase() + id.slice(1);

						const box = (
							<ProtocolBox span={6} active={active} key={id}>
								<Logo src={logoUrl} />
								<Label>{label}</Label>
							</ProtocolBox>
						);

						return active ? <Link href={`/${id}`} key={id}>{box}</Link> : box;
					})
				}
			</ChainRow>
		</Container>
	)
}

const Container = styled(Col)`
	margin-top: 60px;
`;

const Title = styled.h1`
	margin-bottom: 40px;
`;

const ChainRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: 20px;
	row-gap: 20px;
`;

const ProtocolBox = styled.div`
	height: 170px;
	border: solid 1px #eee;
	background-color: #f8f8f8;
	border-radius: 5px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	opacity: ${({ active }) => active ? 1 : 0.4};
	transition: all ease-in 0.2s;

	${({ active }) => active && `
		&:hover {
			border: solid 1px #bfbfbf;
			background-color: #fffce6;
			cursor: pointer;
		}
	`}
`;

const Logo = styled.img`
	height: 50px;
	margin-bottom: 20px;
`;

const Label = styled.div`
	font-size: 18px;
	font-weight: 500;
`;

export default Home