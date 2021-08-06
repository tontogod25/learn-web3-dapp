import { useState, useEffect } from "react";
import * as borsh from 'borsh';
import { Alert, Button, Space, Col, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram} from "@solana/web3.js";

import { getAccountExplorerURL, getTxExplorerURL } from "@solana/lib";
import { CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS } from "types/types";

const { Text } = Typography;

/**
 * The state of a greeting account managed by the hello world program
 */
 class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

// The expected size of each greeting account.
const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount(),
).length;

// cat ~/dist/solana/program/helloworld-keypair.json
const PAYER_SECRET_KEY: number[] =[
  203,45,78,150,193,20,175,50,207,192,239,85,86,175
  ,166,104,3,98,189,126,75,15,53,8,148,44,107,198
  ,132,212,77,231,126,3,236,53,86,103,180,222,142,15
  ,198,225,6,101,100,241,45,225,23,114,100,242,241,206
  ,146,83,88,12,229,170,253,125
]

// cat ~/.config/solana/id.json
const PROGRAM_SECRET_KEY: number[] = [
  82,233,192,228,196,175,32,125,191,102,164,216,86,72,101
  ,115,149,72,184,228,185,107,93,99,19,201,248,14,187,138
  ,54,242,80,26,34,124,18,107,112,71,149,156,255,112,57,189
  ,247,98,208,157,221,68,209,120,249,83,191,13,15,73,143,57,6,2
];

const Program = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [programId, setProgramId] = useState<PublicKey | null>(null);
  const [greeterPublicKey, setGreeterPublicKey] = useState<PublicKey | null>(null);
  const [greetingsCounter, setGreetingsCounter] = useState(null);
  const [greetFetching, setGreetFetching] = useState(false);
  const [greetTxSignature, setGreetTxSignature] = useState<string | null>(null);

  useEffect(() => {
    establishConnection();
  }, [])

  const establishConnection = () => {
    const rpcUrl = "https://api.testnet.solana.com" 
    const connection = new Connection(rpcUrl, "confirmed");
    setConnection(connection);
  }

  const checkProgram = async (cnx: Connection) => {
    if (!PAYER_SECRET_KEY || !PROGRAM_SECRET_KEY) {
      alert("Set PAYER_SECRET_KEY and PROGRAM_SECRET_KEY first!")
    }

    const programSecretKey = new Uint8Array(PROGRAM_SECRET_KEY);
    const programKeypair = Keypair.fromSecretKey(programSecretKey);
    const programId = programKeypair.publicKey;
    setProgramId(programId);
  
    // // Check if the program has been deployed
    // await connection.getAccountInfo(programId);
    // console.log(`Using program ${programId.toBase58()}`);

    const payerSecretKey = new Uint8Array(PAYER_SECRET_KEY);
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);
  
    // Derive the address of a greeting account from the program so that it's easy to find later.
    const GREETING_SEED = 'hello';
    const greetedPubkey = await PublicKey.createWithSeed(
      payerKeypair.publicKey,
      GREETING_SEED,
      programId,
    );
    setGreeterPublicKey(greetedPubkey)
  
    // Check if the greeting account has already been created
    const greetedAccount = await cnx.getAccountInfo(greetedPubkey);
    if (greetedAccount === null) {
      console.log('Creating account', greetedPubkey.toBase58(), 'to say hello to');
      const lamports = await cnx.getMinimumBalanceForRentExemption(GREETING_SIZE);
  
      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payerKeypair.publicKey,
          basePubkey: payerKeypair.publicKey,
          seed: GREETING_SEED,
          newAccountPubkey: greetedPubkey,
          lamports,
          space: GREETING_SIZE,
          programId,
        }),
      );

      sendAndConfirmTransaction(cnx, transaction, [payerKeypair])
        .then(res => console.log(`res`, res))
        .catch(err => console.log(`err`, err))
    }
  }

  const greet = async () => {
    alert("Implement the greet() function!");

    // Load the payer's Keypair from the Uint8Array PAYER_SECRET_KEY
    // by using Keypair.fromsecretkey
    // https://solana-labs.github.io/solana-web3.js/classes/keypair.html#fromsecretkey
  
    // Create the TransactionInstruction by passing keys, programId and data
    // For data you can pass Buffer.alloc(0) as all the program's instructions are the same
  
    // Call sendAndConfirmTransaction
    // https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction
    // On success, call getGreetings() to fetch the greetings counter
  }

  const getGreetings = async (cnx: Connection) => {
    const accountInfo = await cnx.getAccountInfo(greeterPublicKey as PublicKey);

    if (accountInfo === null) throw 'Error: cannot find the greeted account';

    const greeting = borsh.deserialize(
      GreetingSchema,
      GreetingAccount,
      accountInfo.data,
    );
    
    setGreetingsCounter(greeting.counter);
  }

  if (!greeterPublicKey) {
    return (
      <Space>
        <Button type="primary" onClick={async () => { await checkProgram(connection as Connection)}}>Check Program Info</Button>
      </Space>
    )
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button type="default" onClick={async () => { checkProgram(connection as Connection)}}>Check Program Info</Button>
          <Text strong>Program deployed!</Text>
          <a href={programId ? getAccountExplorerURL(programId.toString()) : "#"} target="_blank" rel="noreferrer">View program on Solana Explorer</a>
        </Space>
        <Button type="primary" onClick={greet}>Send a greeting to the program</Button>
        {
          greetFetching &&
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text italic={true} type="secondary">Transaction initiated. Waiting for confirmations...</Text>
            </Space>
        }
        {
          greetTxSignature && !greetFetching &&
            <Alert
              message={
                <Space direction="horizontal">
                  <Text strong>Transaction confirmed!</Text>
                  <Text>{`Greetings Counter: ${greetingsCounter}`}</Text>
                </Space>
              }
              description={
                <a href={greetTxSignature ? getTxExplorerURL(greetTxSignature): "#"} target="_blank" rel="noreferrer">View transaction on Solana Explorer</a>
              }
              type="success"
              showIcon
            />
        }
      </Space>
    </Col>
  );
}

export default Program
