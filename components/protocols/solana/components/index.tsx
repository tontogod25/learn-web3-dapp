import { Alert, Space, Typography, Popover, Button } from 'antd';
import { useAppState } from '@solana/hooks'
import type { EntryT, AlertT } from '@solana/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { networkId, publicKey, contractKey } = state;

    const displayNetworkId = (networkId: string) => networkId
    const displayPublicKey = (publicKey: string) => `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`
    const displayContractKey = (contractKey: string) => `${contractKey.slice(0,5)}...${contractKey.slice(-5)}`

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
            {networkId && <Entry msg={"Network Id: "} value={networkId} display={displayNetworkId} />}
            {publicKey && <Entry msg={"Public key: "} value={publicKey} display={displayPublicKey} />}
            {contractKey && <Entry msg={"Contratc Id"} value={contractKey} display={displayContractKey} />}
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

const Notify = ({ msg, status }: {msg: string, status: AlertT }) => 
    <Alert
        message={
            <Space>
                <Text strong>{msg}</Text>
            </Space>
        }
        type={status}
        showIcon
    />

export { Nav, Notify }
