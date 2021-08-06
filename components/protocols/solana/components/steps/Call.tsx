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
  SystemProgram
} from "@solana/web3.js";

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

const programSecretKey0 = new Uint8Array(PROGRAM_SECRET_KEY);
const programKeypair0 = Keypair.fromSecretKey(programSecretKey0);
const programId0 = programKeypair0.publicKey;

const Program = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [programId, setProgramId] = useState<PublicKey>(programId0);
  const [greeterPublicKey, setGreeterPublicKey] = useState<PublicKey | null>(null);
  const [greetingsCounter, setGreetingsCounter] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [greetTxSignature, setGreetTxSignature] = useState<string | null>(null);

  useEffect(() => {
    establishConnection();
  }, [])

  const establishConnection = () => {
    const rpcUrl = "https://api.devnet.solana.com" 
    const connection = new Connection(rpcUrl, "confirmed");
    setConnection(connection);
  }

  const checkProgram = async (cnx: Connection) => {
    if (!PAYER_SECRET_KEY || !PROGRAM_SECRET_KEY) {
      alert("Set PAYER_SECRET_KEY and PROGRAM_SECRET_KEY first!")
    }

    // const programSecretKey = new Uint8Array(PROGRAM_SECRET_KEY);
    // const programKeypair = Keypair.fromSecretKey(programSecretKey);
    // const programId = programKeypair.publicKey;
    // setProgramId(programId);

    // Check if the program has been deployed
    console.log(await cnx.getVersion())
    console.log(`Using program ${programId.toBase58()}`);
    const programInfo = await cnx.getAccountInfo(programId);  
    if (programInfo === null) {
        throw new Error('Program needs to be built and deployed');
    } else if (!programInfo.executable) {
      throw new Error(`Program is not executable`);
    }
    console.log(`Using program ${programId.toBase58()}`);
    
    // Derive the address of a greeting account from the program so that it's easy to find later.
    const payer = Keypair.fromSecretKey(new Uint8Array(PAYER_SECRET_KEY));
    const GREETING_SEED = 'hello';
    const greetedPubkey = await PublicKey.createWithSeed(
      payer.publicKey,
      GREETING_SEED,
      programId,
    );
    setGreeterPublicKey(greetedPubkey)
  
    // Check if the greeting account has already been created
    const greetedAccount = await cnx.getAccountInfo(greetedPubkey);
    if (greetedAccount === null) {
      console.log('Creating account', greetedPubkey.toBase58(), 'to say hello to');
      const lamports = await cnx.getMinimumBalanceForRentExemption(GREETING_SIZE);
      console.log('Balance of', greetedPubkey.toBase58(), lamports);    
      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payer.publicKey,
          basePubkey: payer.publicKey,
          seed: GREETING_SEED,
          newAccountPubkey: greetedPubkey,
          lamports,
          space: GREETING_SIZE,
          programId,
        }),
      );

      sendAndConfirmTransaction(cnx, transaction, [payer])
        .then(res => console.log(`res`, res))
        .catch(err => console.log(`err here`, err))
    }
  }

  const greet = async (cnx: Connection) => {
    // alert("Implement the greet() function!");

    // Load the payer's Keypair from the Uint8Array PAYER_SECRET_KEY
    // by using Keypair.fromSecretKey
    // https://solana-labs.github.io/solana-web3.js/classes/keypair.html#fromsecretkey
    const payerSecretKey = new Uint8Array(PAYER_SECRET_KEY);
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);
    // Create the TransactionInstruction by passing keys, programId and data
    // For data you can pass Buffer.alloc(0) as all the program's instructions are the same
    const pubkey = greeterPublicKey as PublicKey;
    const instruction = new TransactionInstruction({
      keys: [{pubkey: greeterPublicKey as PublicKey, isSigner: false, isWritable: true}],
      programId,
      data: Buffer.alloc(0), // All instructions are hellos
    });

    // Call sendAndConfirmTransaction
    // https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction
    // On success, call getGreetings() to fetch the greetings counter
    setFetching(true);
    sendAndConfirmTransaction(
      cnx,
      new Transaction().add(instruction),
      [payerKeypair],
    ).then(res => {
      console.log(`SUCCESS`, res);
      setGreetTxSignature(res);
      setFetching(false);
      getGreetings(cnx);
    }).catch(err => {
      console.log(`ERROR`, err);
      setFetching(false);
    });
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
        <Button type="primary" onClick={() => { checkProgram(connection as Connection) }}>Check Program Info</Button>
      </Space>
    )
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button type="default" onClick={() => { checkProgram(connection as Connection) }}>Check Program Info</Button>
          <Text strong>Program deployed!</Text>
          <a href={programId ? getAccountExplorerURL(programId.toString()) : "#"} target="_blank" rel="noreferrer">View program on Solana Explorer</a>
        </Space>
        <Button type="primary" onClick={() => { greet(connection as Connection) }}>Send a greeting to the program</Button>
        {
          fetching &&
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text italic={true} type="secondary">Transaction initiated. Waiting for confirmations...</Text>
            </Space>
        }
        {
          greetTxSignature && !fetching &&
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
