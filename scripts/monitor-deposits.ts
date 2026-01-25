/**
 * Template deposit monitor for HighloadWalletV3
 * - Computes contract address from config
 * - Polls the RPC (or subscribes) for transactions to that address
 * - Detects incoming native TON transfers and calls a placeholder `onDeposit` handler
 *
 * Replace the placeholder code with your TonClient RPC calls and DB/business logic.
 */

import 'dotenv/config';
import { contractAddress } from '@ton/core';
import { HighloadWalletV3Code } from '../wrappers/compiled';
import { highloadWalletV3ConfigToCell } from '../wrappers/HighloadWalletV3';

const RPC_URL = process.env.RPC_URL || 'https://net.ton.dev';
const WORKCHAIN = Number(process.env.WORKCHAIN || 0);
const SUBWALLET_ID = Number(process.env.SUBWALLET_ID || 0x10ad);
const TIMEOUT = Number(process.env.TIMEOUT || 3600);

const publicKeyPlaceholder = Buffer.alloc(32, 0);
const data = highloadWalletV3ConfigToCell({ publicKey: publicKeyPlaceholder, subwalletId: SUBWALLET_ID, timeout: TIMEOUT });
const init = { code: HighloadWalletV3Code, data };
const address = contractAddress(WORKCHAIN, init);

console.log('Monitoring deposits for address:', address.toString({ urlSafe: true, bounceable: true }));

async function onDeposit(tx: any) {
    // TODO: implement mapping from tx -> user (memo, query_id, off-chain mapping)
    console.log('Deposit detected:', tx);
    // Example: credit internal DB, notify user, etc.
}

async function pollOnce() {
    try {
        // TODO: Replace with TonClient or provider calls to fetch transactions for `address`
        // Example pseudocode:
        // import { TonClient } from '@ton/ton';
        // const client = new TonClient({ endpoint: RPC_URL });
        // const txs = await client.getTransactions(address);
        // for (const tx of txs) { if (tx.incoming && tx.value > 0) await onDeposit(tx); }

        console.log('Polling (template) — implement RPC polling/subscription here.');
    } catch (e) {
        console.error('Polling error:', e);
    }
}

setInterval(() => {
    pollOnce().catch(console.error);
}, 15_000);
