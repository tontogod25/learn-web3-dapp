import React from "react"
import styled from "styled-components"
import { Col, Steps, Space } from 'antd'
import { ArrowLeft } from 'react-feather'
import Link from "next/link"
import Image from 'next/image'
import logoSVG from "public/figment-learn-compact.svg"

import { ChainType, StepType } from "types/types"
import { getChainColors } from "utils/colors-utils"

const { Step } = Steps

const Sidebar = ({
	chain,
	steps,
	stepIndex
}: {
	chain: ChainType
	steps: StepType[]
	stepIndex: number
}) => {
	const { bgColor, textColor } = getChainColors(chain.id)

	return (
		<Left span={8} bgColor={bgColor}>
			<Space size="large" direction="horizontal" align="center" style={{ marginBottom: "40px" }}>
				<Image src={logoSVG} alt="Figment Learn" height={41} width={100} />
				<ChainTitle textColor={textColor}>{`${chain.label} Pathway`}</ChainTitle>
			</Space>

			<Steps direction="vertical" size="small" current={stepIndex}>
				{steps.map((s: StepType) => <Step key={s.id} title={s.title} />)}
			</Steps>

			<Footer>
				<Space align="center">
					<ArrowLeft size={20} style={{ marginTop: "7px" }} />
					<Link href="/">See All Pathways</Link>
				</Space>
			</Footer>
		</Left>
	)
}

const ChainTitle = styled.div<{ textColor: string }>`
	color: ${({ textColor }) => textColor};
	margin-bottom: 8px;
	font-size: 28px;
	font-weight: 600;
`;

const Left = styled(Col)<{ bgColor: string }>`
	background: ${({ bgColor }) => bgColor};
	padding: 40px 0 0 40px;
	height: 100vh;
`;

const Footer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0 0 20px 35px;

	a {
		color: black;
		font-size: 15px;
		font-weight: 600;
	}
`;

export default Sidebar
