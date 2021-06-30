import { useRouter } from 'next/router';

import Polygon from "components/protocols/polygon";
import Solana from "components/protocols/solana";
import { PROTOCOLS } from "components/shared/constants";
import { StepType } from "@/types/types";

export default function Protocol() {
  const router = useRouter();
  const { protocol } = router.query

  switch (protocol) {
    case PROTOCOLS.SOLANA.id:
      return <Solana steps={PROTOCOLS.SOLANA.steps as StepType[]} />;
    case PROTOCOLS.POLYGON.id:
      return <Polygon steps={PROTOCOLS.POLYGON.steps as StepType[]} />;
    default:
      return null;
  }
}
