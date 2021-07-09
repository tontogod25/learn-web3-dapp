import React from "react";
import Link from "next/link";
import { Col } from 'antd';
import styled from "styled-components";

import { CHAINS } from "types/types";
import { CHAINS_CONFIG } from "lib/constants";
import { getChainColors } from "utils/colors-utils";

const Home = () => {
	return (
		<Container span={12} offset={6}>
			<Title>Figment Learn - All Pathways</Title>
			<ChainRow>
				{
					Object.keys(CHAINS_CONFIG).map((chain: string) => {
						const { id, active, logoUrl, label } = CHAINS_CONFIG[chain];
						const { bgColor, textColor } = getChainColors(chain as CHAINS)

						const box = (
							<ProtocolBox key={id} active={active} bgColor={bgColor} textColor={textColor}>
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

const ProtocolBox = styled.div<{ active: boolean; bgColor: string; textColor: string }>`
	height: 170px;
	border: solid 1px #eee;
	background-color: #f8f8f8;
	border-radius: 5px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: ${({ active }) => active ? 1 : 0.4};

	${({ active, bgColor, textColor }) => active && `
		&:hover {
			border: none;
			color: ${textColor};
			background: ${bgColor};
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
