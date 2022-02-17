import {transactionSolscan} from './index';
import {
  Cluster,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {Jupiter, RouteInfo, TOKEN_LIST_URL} from '@jup-ag/core';
import {getOrca, OrcaPoolConfig, Network} from '@orca-so/sdk';
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import Decimal from 'decimal.js';
import {SOL_DECIMAL, USDC_DECIMAL, ORCA_DECIMAL} from './wallet';
// If you want to experiment with the keypair below, uncomment the bs58 import.
// import * as bs58 from 'bs58';

// Set true for additional logging during the swap process.
const logging = false;

/**
 * Logging the Keypair object, you'll notice that the publicKey is a 32-byte UInt8Array & the secretKey is the entire 64-byte UInt8Array
 * The first 32 bytes of the array are the secret key and the last 32 bytes of the array are the public key
 * console.log(_account)
 *
 * This returns the entire UInt8Array of 64 bytes
 * console.log(_account.secretKey)
 *
 * The secret key in base58 encoding: 4WoxErVFHZSaiTyDjUhqd6oWRL7gHZJd8ozvWWKZY9EZEtrqxCiD8CFvak7QRCYpuZHLU8FTGALB9y5yenx8rEq3
 * console.log(bs58.encode(_account.secretKey));
 *
 * The publicKey property is either a UInt8Array or a BigNumber:
 * PublicKey { _bn: <BN: 7dfd7f354726fed61eaa4745502e344c65f622106004a427dc58b8c98ab4b5ee> }
 * console.log(_account.publicKey)
 *
 * The public key is commonly represented as a string when being used as an "address": 9UpA4MYkBw5MGfDm5oCB6hskMt6LdUZ8fUtapG6NioLH
 * console.log(_account.publicKey.toString());
 */
// This keypair is provided for testing & learning purposes only.
// Do NOT use this keypair in any production code.
// const _account = Keypair.fromSecretKey(
//   new Uint8Array([
//     175, 193, 241, 226, 223, 32, 155, 13, 1, 120, 157, 36, 15, 39, 141, 146,
//     197, 180, 138, 112, 167, 209, 70, 94, 103, 202, 166, 62, 81, 18, 143, 49,
//     125, 253, 127, 53, 71, 38, 254, 214, 30, 170, 71, 69, 80, 46, 52, 76, 101,
//     246, 34, 16, 96, 4, 164, 39, 220, 88, 184, 201, 138, 180, 181, 238,
//   ]),
// );

// Token interface for Jupiter SDK
export interface TokenI {
  chainId: number; // 101,
  address: string; // '8f9s1sUmzUbVZMoMh6bufMueYH1u4BJSM57RCEvuVmFp',
  symbol: string; // 'TRUE',
  name: string; // 'TrueSight',
  decimals: number; // 9,
  logoURI: string; // 'https://i.ibb.co/pKTWrwP/true.jpg',
  tags: string[]; // [ 'utility-token', 'capital-token' ]
}

// SwapResult interface
export interface SwapResult {
  inAmount: number;
  outAmount: number;
  txIds: string[];
  error?: any;
  timestamp: number; // Unix timestamp
}

export class OrcaSwapClient {
  constructor(
    public readonly keypair: Keypair,
    public readonly connection: Connection,
  ) {}

  /**
   *  The makeATA, closeATA and wrapSOL functions are included for reference.
   *  These instructions are abstracted away from developers during the Orca swap process.
   *  It is still good to understand how these transactions are constructed.
   */

  /**
   * @param mintPubkey - The mint public key of the token for which you want to make an Associated Token Account
   */
  async makeATA(mintPubkey: PublicKey) {
    let ata = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
      TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
      mintPubkey, // mint PublicKey
      this.keypair.publicKey, // owner
    );
    console.log(`ATA for ${mintPubkey}: ${ata.toBase58()}`);
    let tx = new Transaction().add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
        TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
        mintPubkey, // mint
        ata, // ata
        this.keypair.publicKey, // owner of token account
        this.keypair.publicKey, // fee payer
      ),
    );
    const txHash = await this.connection.sendTransaction(tx, [this.keypair]);
    console.log(`makeATA txhash: ${transactionSolscan('devnet', txHash)}`);
  }

  /**
   * @param tokenAcctPubkey - The public key of the Associated Token Account you want to close.
   */
  async closeATA(tokenAcctPubkey: PublicKey) {
    let tx = new Transaction().add(
      Token.createCloseAccountInstruction(
        TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
        tokenAcctPubkey, // token account that you want to close
        this.keypair.publicKey, // destination
        this.keypair.publicKey, // owner of token account
        [], // for multisig
      ),
    );
    const txHash = await this.connection.sendTransaction(tx, [
      this.keypair,
      this.keypair,
    ]);
    console.log(`closeATA txhash: ${transactionSolscan('devnet', txHash)}`);
  }

  /**
   * @param amount An amount of SOL to wrap
   * @param ata - Public key of the Associated Token Account to transfer the wrapped SOL into
   */
  async wrapSOL(amount: number, ata: PublicKey) {
    let tx = new Transaction().add(
      // Transfer SOL
      SystemProgram.transfer({
        fromPubkey: this.keypair.publicKey,
        toPubkey: ata,
        lamports: amount,
      }),
      // Sync Native instruction. @solana/spl-token will release it soon.
      // Here use the raw instruction temporarily.
      new TransactionInstruction({
        keys: [
          {
            pubkey: ata,
            isSigner: false,
            isWritable: true,
          },
        ],
        data: Buffer.from(new Uint8Array([17])),
        programId: TOKEN_PROGRAM_ID,
      }),
    );
    const txHash = await this.connection.sendTransaction(tx, [
      this.keypair,
      this.keypair,
    ]);
    console.log(`wSOL txhash: ${transactionSolscan('devnet', txHash)}`);
  }

  /**
   * @param size The amount of token to swap;
   * @returns TxIds, inAmount, outAmount
   */
  async buy(size: number): Promise<SwapResult> {
    const orca = getOrca(this.connection, Network.DEVNET);
    const orcaSOLPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const orcaUSDCPool = orca.getPool(OrcaPoolConfig.ORCA_USDC);
    const orcaToken = orcaUSDCPool.getTokenA();
    const usdcToken = orcaUSDCPool.getTokenB();
    const usdcAmount = new Decimal(size);
    // Setting slippage lower is not recommended as it can cause swaps to fail
    const slippage = new Decimal(5.0);

    // Swap from USDC -> ORCA
    const quote1 = await orcaUSDCPool.getQuote(usdcToken, usdcAmount, slippage);
    const usdcQuoteAmount = quote1.getMinOutputAmount();
    console.log(
      `Swap ${usdcAmount.toString()} USDC for at least ${usdcQuoteAmount.toNumber()} ORCA`,
    );
    const swapPayload = await orcaUSDCPool.swap(
      this.keypair,
      usdcToken,
      usdcAmount,
      usdcQuoteAmount,
    );

    const swap1TxId = await swapPayload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swap1TxId), '\n');
    }

    // Swap from ORCA -> SOL
    const quote2 = await orcaSOLPool.getQuote(
      orcaToken,
      usdcQuoteAmount,
      slippage,
    );
    const solQuoteAmount = quote2.getMinOutputAmount();
    console.log(
      `Swap ${usdcQuoteAmount.toNumber()} ORCA for at least ${solQuoteAmount.toNumber()} SOL`,
    );
    const swap2Payload = await orcaSOLPool.swap(
      this.keypair,
      orcaToken,
      usdcQuoteAmount,
      solQuoteAmount,
    );
    const swap2TxId = await swap2Payload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swap2TxId), '\n');
    }

    return {
      txIds: [swap1TxId, swap2TxId],
      inAmount: usdcAmount.toNumber() * USDC_DECIMAL,
      outAmount: solQuoteAmount.toNumber() * SOL_DECIMAL,
    } as SwapResult;
  }

  /**
   * @param size The amount of token to swap;
   * @returns TxIds, inAmount, outAmount
   */
  async sell(size: number): Promise<SwapResult> {
    const orca = getOrca(this.connection, Network.DEVNET);
    const orcaSOLPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const solToken = orcaSOLPool.getTokenB();
    const solAmount = new Decimal(size);
    const orcaUSDCPool = orca.getPool(OrcaPoolConfig.ORCA_USDC);
    const orcaToken = orcaSOLPool.getTokenA();
    const usdcToken = orcaUSDCPool.getTokenB();
    // Setting slippage lower is not recommended as it can cause swaps to fail
    const slippage = new Decimal(5.0);

    // Swap SOL -> ORCA
    const quote1 = await orcaSOLPool.getQuote(solToken, solAmount, slippage);
    const orcaQuoteAmount = quote1.getMinOutputAmount();
    console.log(
      `Swap ${solAmount.toString()} SOL for at least ${orcaQuoteAmount.toNumber()} ORCA`,
    );
    const swapPayload = await orcaSOLPool.swap(
      this.keypair,
      solToken,
      solAmount,
      orcaQuoteAmount,
    );
    const swap1TxId = await swapPayload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swap1TxId), '\n');
    }

    // Swap ORCA -> USDC
    const quote2 = await orcaUSDCPool.getQuote(
      orcaToken,
      orcaQuoteAmount,
      slippage,
    );
    const usdcQuoteAmount = quote2.getMinOutputAmount();
    console.log(
      `Swap ${orcaQuoteAmount.toNumber()} ORCA for at least ${usdcQuoteAmount.toNumber()} USDC`,
    );
    const swap2Payload = await orcaUSDCPool.swap(
      this.keypair,
      orcaToken,
      orcaQuoteAmount,
      usdcQuoteAmount,
    );
    const swap2TxId = await swap2Payload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swap2TxId), '\n');
    }

    return {
      txIds: [swap1TxId, swap2TxId],
      inAmount: solAmount.toNumber() * SOL_DECIMAL,
      outAmount: usdcQuoteAmount.toNumber() * USDC_DECIMAL,
    } as SwapResult;
  }

  /**
   * @param size The amount of token to swap;
   * @returns TxIds, inAmount, outAmount
   */
  async sell_to_orca(size: number): Promise<SwapResult> {
    const orca = getOrca(this.connection, Network.DEVNET);
    const orcaSOLPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const solToken = orcaSOLPool.getTokenB();
    const solAmount = new Decimal(size);
    // Setting slippage lower is not recommended as it can cause swaps to fail
    const slippage = new Decimal(5.0);

    const quote1 = await orcaSOLPool.getQuote(solToken, solAmount, slippage);
    const orcaQuoteAmount = quote1.getMinOutputAmount();
    console.log(
      `Swap ${solAmount.toString()} SOL for at least ${orcaQuoteAmount.toNumber()} ORCA`,
    );
    const swapPayload = await orcaSOLPool.swap(
      this.keypair,
      solToken,
      solAmount,
      orcaQuoteAmount,
    );
    const swapTxId = await swapPayload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swapTxId), '\n');
    }

    return {
      txIds: [swapTxId],
      inAmount: solAmount.toNumber() * SOL_DECIMAL,
      outAmount: orcaQuoteAmount.toNumber() * ORCA_DECIMAL,
    } as SwapResult;
  }

  /**
   * @param size The amount of token to swap;
   * @returns TxIds, inAmount, outAmount
   */
  async buy_from_orca(size: number): Promise<SwapResult> {
    const orca = getOrca(this.connection, Network.DEVNET);
    const orcaSOLPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const orcaAmount = new Decimal(size);
    const orcaToken = orcaSOLPool.getTokenA();
    // Setting slippage lower is not recommended as it can cause swaps to fail
    const slippage = new Decimal(5.0);

    const quote1 = await orcaSOLPool.getQuote(orcaToken, orcaAmount, slippage);
    const solQuoteAmount = quote1.getMinOutputAmount();
    console.log(
      `Swap ${orcaAmount.toString()} ORCA for at least ${solQuoteAmount.toNumber()} SOL`,
    );
    const swapPayload = await orcaSOLPool.swap(
      this.keypair,
      orcaToken,
      orcaAmount,
      solQuoteAmount,
    );
    const swapTxId = await swapPayload.execute();

    if (logging) {
      console.log('Signature:', transactionSolscan('devnet', swapTxId), '\n');
    }

    return {
      txIds: [swapTxId],
      inAmount: orcaAmount.toNumber() * ORCA_DECIMAL,
      outAmount: solQuoteAmount.toNumber() * SOL_DECIMAL,
    } as SwapResult;
  }
}

/**
 * Currently, Jupiter aggregation only works with Solana mainnet.
 */
export class JupiterSwapClient {
  private jupiter: Jupiter;

  constructor(
    jupiter: Jupiter,
    public readonly tokenA: TokenI,
    public readonly tokenB: TokenI,
    public readonly keypair: Keypair,
  ) {
    this.jupiter = jupiter;
  }

  static async initialize(
    connection: Connection,
    cluster: Cluster,
    keypair: Keypair,
    tokenAMintAddress: String, // Token to buy
    tokenBMintAddress: String, // token to sell
  ) {
    const jupiter = await Jupiter.load({connection, cluster, user: keypair});
    const tokens: TokenI[] = await (
      await fetch(TOKEN_LIST_URL[cluster])
    ).json(); // Fetch token list from Jupiter API
    const inputToken = tokens.find((t) => t.address == tokenAMintAddress); // Buy token
    const outputToken = tokens.find((t) => t.address == tokenBMintAddress); // Sell token
    console.log('Input token:', inputToken);
    console.log('Output token:', outputToken);
    console.log('Keypair:', keypair);
    console.log(connection, cluster);
    if (!inputToken || !outputToken) {
      throw new Error('Token not found');
    }

    return new JupiterSwapClient(jupiter, inputToken, outputToken, keypair);
  }

  async getRoutes({
    inputToken,
    outputToken,
    inputAmount,
    slippage,
  }: {
    inputToken?: TokenI;
    outputToken?: TokenI;
    inputAmount: number;
    slippage: number;
  }) {
    if (!inputToken || !outputToken) {
      return null;
    }

    console.log('Getting routes');
    const inputAmountLamports = inputToken
      ? Math.round(inputAmount * 10 ** inputToken.decimals)
      : 0; // Lamports based on token decimals
    const routes =
      inputToken && outputToken
        ? await this.jupiter.computeRoutes(
            new PublicKey(inputToken.address),
            new PublicKey(outputToken.address),
            inputAmountLamports,
            slippage,
            true,
          )
        : null;

    if (routes && routes.routesInfos) {
      console.log('Possible number of routes:', routes.routesInfos.length);
      console.log('Best quote: ', routes.routesInfos[0].outAmount);
      return routes;
    } else {
      return null;
    }
  }
  // USDC -> SOL
  async buy(size: number) {
    const routes = await this.getRoutes({
      inputToken: this.tokenB, // USDC
      outputToken: this.tokenA, // SOL
      inputAmount: size, // 1 unit in UI
      slippage: 1, // 1% slippage
    });
    console.log('Routes:', routes);
    if (routes?.routesInfos) {
      console.log('Best Route', routes.routesInfos[0]);
      return this.executeSwap(routes?.routesInfos[0]);
    } else {
      throw new Error('Route not found');
    }
  }
  // SOL -> USDC
  async sell(size: number) {
    const routes = await this.getRoutes({
      inputToken: this.tokenA,
      outputToken: this.tokenB,
      inputAmount: size, // 1 unit in UI
      slippage: 1, // 1% slippage
    });
    if (routes?.routesInfos) {
      console.log('Best Route', routes.routesInfos[0]);
      return this.executeSwap(routes?.routesInfos[0]);
    } else {
      throw new Error('Route not found');
    }
  }

  async executeSwap(route: RouteInfo) {
    // Prepare execute exchange
    const {execute} = await this.jupiter.exchange({
      route,
    });
    // Execute swap
    const swapResult: any = await execute(); // Force any to ignore TS misidentifying SwapResult type

    if (swapResult.error) {
      console.log(swapResult.error);
      return {...swapResult, txIds: [swapResult.txId]}; // fit the swapResult interface
    } else {
      console.log(`https://explorer.solana.com/tx/${swapResult.txid}`);
      console.log(
        `inputAddress=${swapResult.inputAddress.toString()} outputAddress=${swapResult.outputAddress.toString()}`,
      );
      console.log(
        `inputAmount=${swapResult.inputAmount} outputAmount=${swapResult.outputAmount}`,
      );
    }
    return {
      txIds: [swapResult.txid],
      inAmount: swapResult.inputAmount,
      outAmount: swapResult.outputAmount,
    };
  }
}
