import "dotenv/config";

import { getBNBBalance } from "../../sdk/wallet/balance.js";

async function main() {
  console.log("");
  console.log("=================================");
  console.log("       AGENT LAUNCH PAY");
  console.log("       Demo Agent");
  console.log("=================================");
  console.log("");

  const address = process.env.DEMO_WALLET_ADDRESS;

  if (!address) {
    throw new Error(
      "DEMO_WALLET_ADDRESS is not configured in .env"
    );
  }

  const balance = await getBNBBalance(
    address as `0x${string}`
  );

  console.log("Network: BSC Testnet");
  console.log("Chain ID: 97");
  console.log("");

  console.log("Wallet:");
  console.log(balance.address);
  console.log("");

  console.log("Balance:");
  console.log(`${balance.balanceBNB} tBNB`);
  console.log("");

  console.log("Status: BSC Testnet connection successful");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("Demo agent failed:");
  console.error(
    error instanceof Error ? error.message : error
  );
  process.exit(1);
});