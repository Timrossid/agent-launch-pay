import { formatEther } from "viem";
import { publicClient } from "./bsc.js";

export async function getBNBBalance(address: `0x${string}`) {
  const balance = await publicClient.getBalance({
    address,
  });

  return {
    address,
    balanceWei: balance.toString(),
    balanceBNB: formatEther(balance),
  };
}