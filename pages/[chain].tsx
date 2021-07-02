import Head from 'next/head'
import { useRouter } from 'next/router';

import Avalanche from "components/protocols/avalanche"
import Polygon from "components/protocols/polygon";
import Solana from "components/protocols/solana";
import { CHAINS } from "components/shared/constants";
import { ChainType } from 'types/types';

export default function Chain() {
	const router = useRouter();
	const { chain } = router.query

	const protocolName = typeof chain === "string" && chain.charAt(0).toUpperCase() + chain.slice(1);

	return (
		<>
			<Head>
				<title>{`Figment Learn - ${protocolName} Pathway`}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{
				chain === CHAINS.SOLANA.id
					? <Solana chain={CHAINS.SOLANA as ChainType} />
					: chain === CHAINS.POLYGON.id
						? <Polygon chain={CHAINS.POLYGON as ChainType} />
						: chain === CHAINS.AVALANCHE.id
							? <Avalanche chain={CHAINS.AVALANCHE as ChainType} />
							: null
			}
		</>
	)
}
