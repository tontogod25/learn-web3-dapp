import { Typography, Popover, Button } from 'antd';
import { useAppState } from 'components/protocols/secret/hooks'
import type { EntryT } from 'components/protocols/secret/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { network, address, mnemonic, contractAddress } = state;

    const displayNetwork = (network: string) => network.slice(0,5)
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
            {contractAddress && <Entry msg={"contractAddress: "} value={contractAddress} display={displayPublicKey} />}
        </>
        )
    }

    return (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
            <Popover content={AppState} placement="rightBottom">
                <Button type="primary">Storage</Button>
            </Popover>
        </div>
    )
}

export { Nav }
