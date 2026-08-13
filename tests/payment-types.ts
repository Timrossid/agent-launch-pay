import { isAddress } from "viem";
import type { PaymentRequest } from "../sdk/payments/send.js";

const examplePayment: PaymentRequest = {
  to: "0x0000000000000000000000000000000000000000",
  amount: "0.001",
};

console.log("Payment request structure:");
console.log(examplePayment);

console.log(
  "Recipient address valid:",
  isAddress(examplePayment.to)
);