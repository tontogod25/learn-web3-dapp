import Head from 'next/head'
import { useRouter } from 'next/router';

import Solana from "components/protocols/solana";
import { PROTOCOLS } from "components/shared/constants";
import { StepType } from "components/shared/types";

export default function Protocol() {
  const router = useRouter();
  const { protocol } = router.query

  console.log(`protocol`, protocol)

  switch (protocol) {
    case PROTOCOLS.SOLANA.id:
      return <Solana steps={PROTOCOLS.SOLANA.steps as StepType[]} />;
    default:
      return <div>Oops</div>;
  }
}
