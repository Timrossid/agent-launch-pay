import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

import { getBNBBalance } from "../sdk/wallet/balance.js";
import { sendPayment } from "../sdk/payments/send.js";
import { verifyTransaction } from "../sdk/verification/transaction.js";

function createServer() {
  const server = new McpServer({
    name: "agent-launch-pay",
    version: "0.1.0",
  });

  // --------------------------------------------------
  // Tool 1: Get BSC Testnet wallet balance
  // --------------------------------------------------

  server.registerTool(
    "get_wallet_balance",
    {
      description:
        "Get the tBNB balance of any BSC Testnet wallet address.",
      inputSchema: z.object({
        address: z
          .string()
          .regex(
            /^0x[a-fA-F0-9]{40}$/,
            "Address must be a valid EVM address"
          ),
      }),
    },
    async ({ address }) => {
      try {
        const balance = await getBNBBalance(
          address as `0x${string}`
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(balance, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Balance lookup failed: ${message}`,
            },
          ],
        };
      }
    }
  );

  // --------------------------------------------------
  // Tool 2: Send BSC Testnet payment
  // --------------------------------------------------

  server.registerTool(
    "send_payment",
    {
      description:
        "Send a native tBNB payment on BSC Testnet. This broadcasts a real testnet transaction.",
      inputSchema: z.object({
        to: z
          .string()
          .regex(
            /^0x[a-fA-F0-9]{40}$/,
            "Recipient must be a valid EVM address"
          ),

        amount: z
          .string()
          .regex(
            /^(?:0|[1-9]\d*)(?:\.\d+)?$/,
            "Amount must be a valid positive decimal number"
          ),
      }),
    },
    async ({ to, amount }) => {
      try {
        const result = await sendPayment({
          to: to as `0x${string}`,
          amount,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Payment failed: ${message}`,
            },
          ],
        };
      }
    }
  );

  // --------------------------------------------------
  // Tool 3: Verify BSC Testnet transaction
  // --------------------------------------------------

  server.registerTool(
    "verify_payment",
    {
      description:
        "Wait for a BSC Testnet transaction to confirm and return its receipt details.",
      inputSchema: z.object({
        hash: z
          .string()
          .regex(
            /^0x[a-fA-F0-9]{64}$/,
            "Transaction hash must be a valid 32-byte transaction hash"
          ),
      }),
    },
    async ({ hash }) => {
      try {
        const result = await verifyTransaction(
          hash as `0x${string}`
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Verification failed: ${message}`,
            },
          ],
        };
      }
    }
  );

  return server;
}

// --------------------------------------------------
// Start MCP server over stdio
// --------------------------------------------------

const handle = serveStdio(createServer);

console.error("agent-launch-pay MCP server running on stdio");

// --------------------------------------------------
// Graceful shutdown
// --------------------------------------------------

process.on("SIGINT", () => {
  void handle.close();
});