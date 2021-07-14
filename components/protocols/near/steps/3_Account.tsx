import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from "axios";
import { Alert, Button, Col, Space, Typography, Input } from 'antd';
import type { AccountView } from 'near-api-js/lib/providers/provider';
import { useAppState } from '@near/hooks'
import { getPrettyPublicKey, getPublicKey } from '@near/utils';

const { Text } = Typography;

const Account = () => {
    const [accountView, setAccountView] = useState<AccountView>();
    const [accountId, setAccountId] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);

    const { state, dispatch } = useAppState();
    const networkId = state.networkId;
/*
    useEffect(() => {
        if (state.accountId) {
            setIsFreeAccountId(true)
            setAccountId(state.accountId)
            console.log('ici');
        }
    }, [])
*/
    useEffect(() => {
        if (isFreeAccountId) {
            dispatch({
                type: "SetAccountId",
                accountId
            })
        }
    }, [accountView])

    const publicKeyStr = state?.secretKey && getPrettyPublicKey(state.secretKey);

    const createAccountWithId = () => {
        setIsFetching(true);
        const publicKey = state?.secretKey && getPublicKey(state.secretKey);
		axios
			.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/createAccountId`, { accountId, publicKey, networkId })
            .then(res => {
                setAccountView(res.data);
                setIsFetching(false);
            })
			.catch(err => {
                console.error(err);
                setIsFetching(false);
			})
	}

    const AccountStatusBox = () =>
        <Col>
            <Space direction="vertical">
                <Alert
                    message={
                        <Space>
                            <Text strong>Account generated!</Text>
                        </Space>
                    }
                    description={
                        <ul>
                            <li>
                                Account: <Text code>{accountId}</Text>
                            </li>
                            <li>
                                Public key: <Text code>{publicKeyStr}</Text>
                            </li>
                            <li>
                                Amount: <Text code>{accountView?.amount}</Text>
                            </li>
                        </ul>
                    }
                    type="success"
                    showIcon
                />
            </Space>
        </Col>

    const checkAccounIdProps = {
        accountId,
        setAccountId,
        setIsFreeAccountId,
        networkId,
    }
    
    return (
    <>
        <Col>
            <Space direction="vertical" size="middle" >        
                <CheckAccountId {...checkAccounIdProps} />
                <Button type="primary" onClick={ createAccountWithId } style={{ marginBottom: "20px" }} loading={isFetching} disabled={!isFreeAccountId}>
                    Create Account
                </Button>
                { accountView && <AccountStatusBox /> }
            </Space>
        </Col>
    </>
    );
}

type AlertT = "success" | "info" | "warning" | "error" | undefined
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

type CheckAccountIdPropsT = {
    networkId: string
    accountId: string
    setAccountId: Dispatch<SetStateAction<string>>
    setIsFreeAccountId: Dispatch<SetStateAction<boolean>>
}

const CheckAccountId = ({
    networkId,
    accountId,
    setAccountId,
    setIsFreeAccountId,
}: CheckAccountIdPropsT ) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('Valid account should look like NAME.testnet');
    const [alertStatus, setAlertStatus] = useState<AlertT>('info');

    const checkAvailabilityOfAccountId = () => {
        setIsFetching(true)
        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/checkAccountId`, { accountId, networkId })
            .then(res => {
                if (res.data) {
                    setIsFreeAccountId(res.data);
                    setAlertStatus('success');
                    setAlertMsg(`Account ${accountId} is available`);
                } else {
                    setIsFreeAccountId(res.data);
                    setAlertStatus('error');
                    setAlertMsg(`Account ${accountId} is not available`);
                }
                setIsFetching(false);
            })
            .catch(err => {
                console.error(err);
                setAlertStatus('error');
                setAlertMsg(`Near connection failed`);
                setIsFreeAccountId(true);
                setIsFetching(false);
            })
    }

    const onInputChange = (e: any) => {
        setAlertStatus('info')
        setAlertMsg('Valid account should look like NAME.testnet');
        setIsFreeAccountId(false);
        setAccountId(e.target.value)
    }

    const valideAccountId: boolean = !(accountId.slice(-8) === ".testnet");

    return (
        <Space direction="vertical" size="small">
            <Text style={{ fontWeight: "bold", fontSize: 20}}>Choose an account identifiant:</Text>
            <Space direction="horizontal" size="small">
                <Input placeholder="my-super-nick.testnet" onChange={onInputChange} style={{ width: "500px" }} />
                <Button type="primary" onClick={checkAvailabilityOfAccountId} loading={isFetching} disabled={ valideAccountId }>Check it!</Button>
            </Space>
            <Notify msg={alertMsg} status={alertStatus} />
        </Space>
    )
}

export default Account
