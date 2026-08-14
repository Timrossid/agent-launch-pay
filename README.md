# agent-launch-pay

Open-source payment infrastructure for AI agents on BNB Chain.

`agent-launch-pay` provides a reusable TypeScript SDK and MCP server that allow AI agents and agent applications to:

- Check BSC Testnet wallet balances
- Send native tBNB payments
- Verify transaction confirmations
- Access payment functionality through MCP tools

The project is being developed for the Agent Launch ecosystem and is designed to make blockchain payments easier to integrate into autonomous agents.

## Architecture

```text
AI Agent
    |
    v
MCP Server
    |
    +-------------------------+
    |                         |
    v                         v
get_wallet_balance       send_payment
    |                         |
    |                         v
    |                    BSC Testnet
    |                         |
    +------------+------------+
                 |
                 v
          verify_payment
```

## MCP Tools

### `get_wallet_balance`

Returns the native tBNB balance for a BSC Testnet address.

Input:

```json
{
  "address": "0x..."
}
```

### `send_payment`

Sends native tBNB on BSC Testnet.

Input:

```json
{
  "to": "0x...",
  "amount": "0.0001"
}
```

This tool requires a configured signing wallet.

### `verify_payment`

Waits for a BSC Testnet transaction to confirm and returns transaction details and a BSCScan Testnet explorer link.

Input:

```json
{
  "hash": "0x..."
}
```

## Project Structure

```text
agent-launch-pay/
|
├── sdk/
│   ├── wallet/
│   │   ├── bsc.ts
│   │   └── balance.ts
│   ├── payments/
│   │   └── send.ts
│   └── verification/
│       └── transaction.ts
|
├── mcp-server/
│   └── index.ts
|
├── examples/
│   └── demo-agent/
│       ├── index.ts
│       └── payment-demo.ts
|
├── tests/
│   └── payment-types.ts
|
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Requirements

- Node.js 20+
- npm
- A BSC Testnet RPC endpoint
- A BSC Testnet wallet for payment testing

## Installation

Clone the repository:

```bash
git clone https://github.com/Timrossid/agent-launch-pay.git
cd agent-launch-pay
```

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file:

```env
BSC_TESTNET_RPC_URL=
AGENT_PRIVATE_KEY=
DEMO_WALLET_ADDRESS=
DEMO_RECIPIENT_ADDRESS=
```

Never commit `.env` or a private key to GitHub.

## Development

Type-check the project:

```bash
npm run typecheck
```

Build the project:

```bash
npm run build
```

Run the balance demo:

```bash
npm run dev
```

Run the payment demo once the wallet has tBNB:

```bash
npm run demo:payment
```

## MCP Server

Start the MCP server with:

```bash
npm run mcp
```

The MCP server exposes:

- `get_wallet_balance`
- `send_payment`
- `verify_payment`

The server communicates over standard input/output and can be tested with MCP Inspector.

## Current Status

### Testnet Transaction

The first end-to-end payment was successfully executed on BSC Testnet.

- Network: BSC Testnet
- Chain ID: 97
- Amount: 0.00001 tBNB
- Status: Success
- Block: 125001606
- Gas used: 21,000
- Transaction: https://testnet.bscscan.com/tx/0x41e8b79ec9c57bad786f57abc137006472293a25e0bb3c2a94bcde9f5b74ddc2

### Working

- TypeScript SDK
- BSC Testnet RPC connection
- Wallet balance lookup
- Payment request validation
- Native tBNB payment implementation
- Transaction verification
- MCP server
- MCP Inspector integration
- Demo agent
- End-to-end payment demo

### In Progress

- First funded BSC Testnet transaction
- Public transaction verification
- MCP integration examples
- Integration documentation
- Additional automated tests

## Roadmap

### Phase 1: Core SDK

- [x] BSC Testnet connection
- [x] Wallet balance lookup
- [x] Payment function
- [x] Transaction verification

### Phase 2: MCP

- [x] MCP server
- [x] Balance tool
- [x] Payment tool
- [x] Verification tool
- [x] MCP Inspector testing

### Phase 3: Testnet Proof

- [ ] Fund test wallet
- [ ] Execute real tBNB payment
- [ ] Verify transaction on BSCScan
- [ ] Record transaction hash
- [ ] Create demo video

### Phase 4: Ecosystem Integration

- [ ] Improve developer documentation
- [ ] Add reusable integration examples
- [ ] Add additional automated tests
- [ ] Explore Agent Launch / Fetch.ai agent integration

## Security

This project is currently intended for BSC Testnet experimentation.

Never commit private keys, seed phrases, or other wallet credentials.

The payment functionality should only be used with testnet funds during development.

## License

MIT