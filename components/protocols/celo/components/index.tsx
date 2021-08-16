import { Typography, Popover, Button } from 'antd';
import { useAppState } from '@ccelo/hooks'
import type { EntryT } from '@ccelo/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { network, secret, address, contractAddress } = state;

    const displayNetwork = (network: string) => network
    const displayAddress = (address: string) => `${address.slice(0,5)}...${address.slice(-5)}`
    const displaySecret = (secret: string) => `${secret.slice(0,5)}...${secret.slice(-5)}`

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
            {network && <Entry msg={"Network version: "} value={network} display={displayNetwork} />}
            {address && <Entry msg={"Address: "} value={address} display={displayAddress} />}
            {secret && <Entry msg={"Secret"} value={secret} display={displaySecret} />}
            {contractAddress && <Entry msg={"Address: "} value={contractAddress} display={displayAddress} />}
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
