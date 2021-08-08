import { Typography, Popover, Button } from 'antd';
import { useAppState } from 'components/protocols/secret/hooks'
import type { EntryT } from 'components/protocols/secret/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { network } = state;

    const displayNetwork = (network: string) => network
    // const displayPublicKey = (publicKey: string) => `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`
    // const displayContractKey = (contractKey: string) => `${contractKey.slice(0,5)}...${contractKey.slice(-5)}`

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
            {/* {publicKey && <Entry msg={"Public key: "} value={publicKey} display={displayPublicKey} />} */}
            {/* {contractKey && <Entry msg={"Contratc Id"} value={contractKey} display={displayContractKey} />} */}
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
