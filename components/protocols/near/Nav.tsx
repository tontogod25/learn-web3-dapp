import { Typography, Popover, Button } from 'antd';
import { useAppState } from '@near/hooks'
import { getPrettyPublicKey } from '@near/utils';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { networkId, secretKey, accountId, contractId} = state;

    const displaySecretKey = (secretKey: string) => `${getPrettyPublicKey(secretKey).slice(0,5)}...${getPrettyPublicKey(secretKey).slice(-5)}`
    const displayNetworkId = (networkId: string) => networkId
    const displayAccountId = (accountId: string) => accountId
    const displayContractId = (contractId: string) => contractId

    type EntryT = {
        msg: string
        display: (value: string) => string
        value: string
    }
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
            <Entry msg={"Network: "} value={networkId} display={displayNetworkId} />
            {secretKey && <Entry msg={"Public key: "} value={secretKey} display={displaySecretKey} />}
            {accountId && <Entry msg={"Account Id: "} value={accountId} display={displayAccountId} />}
            {contractId && <Entry msg={"Contratc Id"} value={ contractId} display={displayContractId} />}
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

export default Nav
