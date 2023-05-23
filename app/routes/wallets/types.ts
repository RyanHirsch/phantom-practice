type Chain = "SOL" | "ETH" | "MATIC";

type GeneratedWallet = {
  displayName?: string;
  source: "generated";
  iteration: number;
  addresses: Record<Chain, string>;
};
type ImportedWallet = {
  displayName?: string;
  source: "imported";
  chain: "SOL";
  address: string;
};
export type Wallet = GeneratedWallet | ImportedWallet;
