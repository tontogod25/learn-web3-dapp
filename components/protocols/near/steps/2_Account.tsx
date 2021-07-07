import { Dispatch, SetStateAction } from 'react'

interface Input {
    keypair: string,
    setKeypair: Dispatch<SetStateAction<string>>
}

const Account = ({ keypair, setKeypair } : Input) => <div>Account</div>

export default Account