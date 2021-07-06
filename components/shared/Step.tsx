import React from 'react';
import { Alert, Button, Row, Col, Typography, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ArrowUpRight } from 'react-feather';

import { ChainType, StepType } from 'types/types';

const { Text } = Typography;

const Step = ({
	chain,
	step,
	isFirstStep,
	isLastStep,
	prev,
	next,
	body,
	nav,
}: {
	chain: ChainType
	step: StepType
	isFirstStep: boolean
	isLastStep: boolean
	prev(): void
	next(): void
	body: JSX.Element
	nav?: JSX.Element
}) => {
	return (
		<Right span={16}>
			<Col>
				<StepHeader>
					<Title>{step.title}</Title>
					<Alert
						message={
							<Space>
								<Text strong>Start here!</Text>
								<Space align="center" size="small">
									<Link><a href={step.url} target="_blank" rel="noreferrer">View step Instructions</a></Link>
									<ArrowUpRight color="#1890ff" size={18} style={{ marginTop: "6px" }} />
								</Space>
							</Space>
						}
						type="info"
					/>
				</StepHeader>

				<StepContent>
					{body}
				</StepContent>

				<StepButtons
					key={step.id}
					chainId={chain.id}
					next={next}
					prev={prev}
					isFirstStep={isFirstStep}
					isLastStep={isLastStep}
				/>

				{nav}
			</Col>
		</Right>
	)
}

const StepButtons = ({
	chainId,
	next,
	prev,
	isFirstStep,
	isLastStep,
}: {
	chainId: string
	next(): void
	prev(): void
	isFirstStep: boolean
	isLastStep: boolean
}) => {
	return (
		<StepFooter size="large">
			{!isFirstStep &&
				<PrevButton size="large" style={{ marginRight: '8px' }} onClick={() => prev()} icon={<ArrowLeftOutlined />}>
					Previous Step
				</PrevButton>
			}
			{!isLastStep &&
				<NextButton size="large" type="primary" onClick={() => next()} textColor={getButtonTextColor(chainId)} bgColor={getButtonBgColor(chainId)}>
					<Row align="middle">
						Next Step
						<ArrowRightOutlined size={20} style={{ marginLeft: "6px" }} />
					</Row>
				</NextButton>
			}
		</StepFooter>
	)
}

const getButtonBgColor = (chainId: string) => {
	if (chainId === "solana") {
		return 'linear-gradient(253deg, #00FFA3, #DC1FFF)';
	} else if (chainId === "avalanche") {
		return '#e84141';
	} else if (chainId === "polygon") {
		return '#8247e5';
	} else if (chainId === "polkadot") {
		return '#e6007a';
	} else if (chainId === "tezos") {
		return '#0f62ff';
	}
	return "rgb(255,242,155)"
}

const getButtonTextColor = (chainId: string) => {
	if (chainId === "solana") {
		return "white";
	}
	return "white"
}

const Right = styled(Col)`
	padding: 60px;
	height: 100vh;
`;

const StepHeader = styled(Col)`
	margin-bottom: 40px;
`;

const StepFooter = styled(Space)`
	margin-top: 20px;
`;

const Title = styled.div`
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 10px;
`;

const Link = styled.div`
	font-weight: 400;

	&:hover {
		text-decoration: underline;
	}
`;

const StepContent = styled.div`
	min-height: 250px;
	margin-bottom: 100px;
`;

const NextButton = styled(Button)<{ bgColor: string; textColor: string }>`
	border: none;

	color: ${({ textColor })=> textColor};
	background: ${({ bgColor })=> bgColor};

	&:hover {
		background: ${({ bgColor })=> bgColor};
		color: ${({ textColor })=> textColor};
		border: none;
		box-shadow: black 2px 2px 1px;
	}
`;

const PrevButton = styled(Button)`
	background: white;
	border: solid #BBB 1px;
	color: #555;

	&:hover {
		color: black;
		border: solid black 1px;
	}
`;

export default Step;