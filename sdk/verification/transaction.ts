import { publicClient } from "../wallet/bsc.js";

export async function verifyTransaction(
  hash: `0x${string}`
) {
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  return {
    hash,
    status: receipt.status,
    blockNumber: receipt.blockNumber.toString(),
    gasUsed: receipt.gasUsed.toString(),
    from: receipt.from,
    to: receipt.to ?? null,
    explorerUrl: `https://testnet.bscscan.com/tx/${hash}`,
  };
}