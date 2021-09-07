import { Alert, Space, Typography, Popover, Button } from 'antd';
import { useAppState } from '@avalanche/hooks'
import type { EntryT, AlertT } from '@avalanche/types';
import {trackStorageCleared} from "../../../../utils/tracking-utils";

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state, dispatch } = useAppState();
    const { network, address, secret } = state;

    const displayNetwork = (networkId: string) => networkId
    const displayAddress = (address: string) => `${address.slice(0,5)}...${address.slice(-5)}`

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
            {address && <Entry msg={"Address: "} value={address} display={displayAddress} />}
            {secret && <Entry msg={"Secret: "} value={secret} display={displayAddress} />}
        </>
        )
    }

    const clearStorage = () => {
        alert('You are going to clear the storage')
        localStorage.removeItem('avalanche')
        dispatch({
            type: 'SetAddress',
            address: undefined
        })
        dispatch({
            type: 'SetSecret',
            secret: undefined
        })
        dispatch({
            type: 'SetIndex',
            index: 0
        })
        dispatch({
            type: 'SetNetwork',
            network: 'fuji'
        })
        trackStorageCleared('avalanche');
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
