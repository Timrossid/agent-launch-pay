import {
  formatEther,
  isAddress,
  parseEther,
} from "viem";

import {
  publicClient,
  getAccount,
  getWalletClient,
  bscTestnet,
} from "../wallet/bsc.js";

export interface PaymentRequest {
  to: `0x${string}`;
  amount: string;
}

export interface PaymentResult {
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  amount: string;
}

export async function sendPayment(
  request: PaymentRequest
): Promise<PaymentResult> {
  const { to, amount } = request;

  if (!isAddress(to)) {
    throw new Error(`Invalid recipient address: ${to}`);
  }

  const value = parseEther(amount);

  if (value <= 0n) {
    throw new Error("Payment amount must be greater than zero");
  }

  const account = getAccount();

  const balance = await publicClient.getBalance({
    address: account.address,
  });

  if (balance < value) {
    throw new Error(
      `Insufficient tBNB balance. Available: ${formatEther(balance)}, required: ${amount}`
    );
  }

  const chainId = await publicClient.getChainId();

  if (chainId !== bscTestnet.id) {
    throw new Error(
      `Wrong network. Expected BSC Testnet (${bscTestnet.id}), got ${chainId}`
    );
  }

  const walletClient = getWalletClient();

  const hash = await walletClient.sendTransaction({
    account,
    to,
    value,
  });

  return {
    hash,
    from: account.address,
    to,
    amount,
  };
}