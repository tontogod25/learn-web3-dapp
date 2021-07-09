import { Dispatch, SetStateAction } from 'react'

interface Input {
    keypair: string | null,
    setKeypair: Dispatch<SetStateAction<string | null>>
}

const Account = ({ keypair, setKeypair } : Input) => <div>Account</div>

export default Account
