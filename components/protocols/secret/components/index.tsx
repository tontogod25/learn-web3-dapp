import { Typography, Popover, Button } from 'antd';
import { useAppState } from 'components/protocols/secret/hooks'
import type { EntryT } from 'components/protocols/secret/types';
import {trackStorageCleared} from "../../../../utils/tracking-utils";

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state, dispatch } = useAppState();
    const { network, address, mnemonic, contract } = state;

    const displayNetwork = (network: string) => network
    const displayPublicKey = (publicKey: string) => `${publicKey.slice(7,13)}...${publicKey.slice(-5)}`
    const displayMnemonic = (mnemonic: string) => `${mnemonic.slice(0, 5)}...${mnemonic.slice(-5)}`

    const Entry = ({ msg, display, value }: EntryT) => {
        return (
            <Paragraph copyable={{ text: value }}>
                <Text strong>{msg}</Text>
                <Text code>{display(value)}</Text>
            </Paragraph>
        )
    }

    const AppState = () => {
        return (
            <>
                {network && <Entry msg={"Network: "} value={network} display={displayNetwork} />}
                {address && <Entry msg={"Address: "} value={address} display={displayPublicKey} />}
                {mnemonic && <Entry msg={"mnemonic: "} value={mnemonic} display={displayMnemonic} />}
                {contract && <Entry msg={"contractAddress: "} value={contract} display={displayPublicKey} />}
            </>
        )
    }

    const clearStorage = () => {
        alert('You are going to clear the storage')
        localStorage.removeItem('secret')
        dispatch({
            type: 'SetMnemonic',
            mnemonic: undefined
        })
        dispatch({
            type: 'SetAddress',
            address: undefined
        })
        dispatch({
            type: 'SetContract',
            contract: undefined
        })
        dispatch({
            type: 'SetIndex',
            index: 0
        })
        dispatch({
            type: 'SetNetwork',
            network: 'holodeck-2'
        })
        trackStorageCleared('secret');
    }

    return (
        <>
            <div style={{ position: "fixed", top: 25, right: 60 }}>
                <Popover content={AppState} placement="rightBottom">
                    <Button type="primary">Storage</Button>
                </Popover>
            </div>
            <div style={{ position: "fixed", top: 25, right: 165 }}>
                <Button danger onClick={clearStorage}>Clear Storage</Button>
            </div>
        </>
        )
}

export { Nav }
