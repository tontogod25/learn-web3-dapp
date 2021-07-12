import { KeyPair } from "near-api-js";

type KeyPairT = KeyPair | undefined;

interface TransertPropsT {
    keypair: KeyPairT,
}

const Transfer = ({ keypair }: TransertPropsT) => {
    console.log(keypair);
    return (
        <div>Balance</div>
    )
}

export default Transfer
