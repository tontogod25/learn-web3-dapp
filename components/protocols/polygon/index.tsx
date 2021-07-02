import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";
import Connect from "./steps/1_Connect";
import { useSteps } from "hooks/steps-hooks";

const { Text, Paragraph } = Typography;

const Polygon = ({
  chain
}: {
  chain: ChainType
}) => {
  const [keypair, setKeypair] = useState(null);
  const { steps } = chain

  const {
    next,
    prev,
    stepIndex,
    step,
    isFirstStep,
    isLastStep
  } = useSteps(steps);

  return (
    <Row>
      <Sidebar
        chain="Polygon"
        steps={steps}
        stepIndex={stepIndex}
      />
      <Step
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prev}
        next={next}
        body={
          <>
            {step.id === "connect" && <Connect />}
          </>
        }
        // nav={<Nav keypair={keypair} />}
      />
    </Row>
  );
}

// const Nav = ({ keypair }: { keypair: any }) => {
//   if (!keypair) return null;

//   const publicKey = keypair.publicKey.toString();
//   const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

//   return (
//     <div style={{ position: "fixed", top: 20, right: 20 }}>
//       <Paragraph copyable={{ text: keypair.publicKey.toString() }}>
//         <Text code>{publicKeyToDisplay}</Text>
//       </Paragraph>
//     </div>
//   )
// }

export default Polygon