import { Typography, Popover, Button } from 'antd';
import { useAppState } from '@tezos/hooks'
import type { EntryT } from '@tezos/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { network } = state;

    const displayNetworkId = (networkId: string) => networkId
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
            {network && <Entry msg={"Network Id: "} value={network} display={displayNetworkId} />}
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
