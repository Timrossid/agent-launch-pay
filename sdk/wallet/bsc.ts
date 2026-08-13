import "dotenv/config";

import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

const rpcUrl = process.env.BSC_TESTNET_RPC_URL;

if (!rpcUrl) {
  throw new Error("BSC_TESTNET_RPC_URL is not configured");
}

export const bscTestnet = defineChain({
  id: 97,
  name: "BSC Testnet",
  nativeCurrency: {
    name: "tBNB",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
    },
  },
});

export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(rpcUrl),
});

export function getAccount() {
  const privateKey = process.env.AGENT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("AGENT_PRIVATE_KEY is not configured");
  }

  return privateKeyToAccount(
    privateKey as `0x${string}`
  );
}

export function getWalletClient() {
  const account = getAccount();

  return createWalletClient({
    account,
    chain: bscTestnet,
    transport: http(rpcUrl),
  });
}