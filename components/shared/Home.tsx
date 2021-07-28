import React from "react";
import Link from "next/link";
import { Col } from 'antd';
import styled from "styled-components";

import { CHAINS } from "types/types";
import { CHAINS_CONFIG } from "lib/constants";
import { getChainColors } from "utils/colors-utils";
import ProtocolLogo from "components/icons";

const Home = () => {
	return (
		<Container span={14} offset={5}>
			<Title>Figment Learn - All Pathways</Title>
			<ChainRow>
				{
					Object.values(CHAINS_CONFIG).map(c => c.id).map((chain: CHAINS) => {
						const { id, active, label } = CHAINS_CONFIG[chain];
						const { primaryColor, secondaryColor } = getChainColors(chain as CHAINS)

						const box = (
							<ProtocolBox key={id} active={active} primary_color={primaryColor} secondary_color={secondaryColor}>
								<ProtocolLogo chainId={chain} />
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
	grid-template-columns: 1fr 1fr 1fr 1fr;
	column-gap: 20px;
	row-gap: 20px;
`;

const ProtocolBox = styled.div<{ active: boolean; primary_color: string; secondary_color: string }>`
	height: 170px;
	border: solid 1px #eee;
	background-color: #f8f8f8;
	border-radius: 5px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: ${({ active }) => active ? 1 : 0.4};

	${({ active, primary_color, secondary_color }) => active && `
		&:hover {
			border: none;
			color: ${secondary_color};
			background: ${primary_color};
			cursor: pointer;
		}
	`}

	&:hover > svg {
		path {
			fill: ${({ secondary_color }) => `${secondary_color}`};
		}
	}
`;

const Label = styled.div`
	font-size: 16px;
	font-weight: 500;
`;

export default Home
