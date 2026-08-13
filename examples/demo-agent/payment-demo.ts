import "dotenv/config";

import { getBNBBalance } from "../../sdk/wallet/balance.js";
import { sendPayment } from "../../sdk/payments/send.js";
import { verifyTransaction } from "../../sdk/verification/transaction.js";

async function main() {
  console.log("");
  console.log("=================================");
  console.log("       AGENT LAUNCH PAY");
  console.log("       Payment Demo");
  console.log("=================================");
  console.log("");

  const sender = process.env.DEMO_WALLET_ADDRESS;
  const recipient = process.env.DEMO_RECIPIENT_ADDRESS;

  if (!sender) {
    throw new Error(
      "DEMO_WALLET_ADDRESS is not configured in .env"
    );
  }

  if (!recipient) {
    throw new Error(
      "DEMO_RECIPIENT_ADDRESS is not configured in .env"
    );
  }

  const balanceBefore = await getBNBBalance(
    sender as `0x${string}`
  );

  console.log("Network: BSC Testnet");
  console.log("Chain ID: 97");
  console.log("");

  console.log("Sender:");
  console.log(sender);
  console.log("");

  console.log("Recipient:");
  console.log(recipient);
  console.log("");

  console.log("Balance before payment:");
  console.log(`${balanceBefore.balanceBNB} tBNB`);
  console.log("");

  const amount = "0.0001";

  console.log(`Sending ${amount} tBNB...`);
  console.log("");

  const payment = await sendPayment({
    to: recipient as `0x${string}`,
    amount,
  });

  console.log("Transaction submitted!");
  console.log("");

  console.log("Transaction hash:");
  console.log(payment.hash);
  console.log("");

  console.log(
    `https://testnet.bscscan.com/tx/${payment.hash}`
  );
  console.log("");

  console.log("Waiting for confirmation...");
  console.log("");

  const verification = await verifyTransaction(
    payment.hash
  );

  console.log("Transaction confirmed!");
  console.log("");

  console.log("Status:");
  console.log(verification.status);
  console.log("");

  console.log("Block:");
  console.log(verification.blockNumber);
  console.log("");

  console.log("Gas used:");
  console.log(verification.gasUsed);
  console.log("");

  console.log("Explorer:");
  console.log(verification.explorerUrl);
  console.log("");

  const balanceAfter = await getBNBBalance(
    sender as `0x${string}`
  );

  console.log("Balance after payment:");
  console.log(`${balanceAfter.balanceBNB} tBNB`);
  console.log("");

  console.log("=================================");
  console.log("       PAYMENT SUCCESSFUL");
  console.log("=================================");
}

main().catch((error) => {
  console.error("");
  console.error("Payment demo failed:");
  console.error(
    error instanceof Error ? error.message : error
  );
  console.error("");

  process.exit(1);
});