import fs from "node:fs";
import path from "node:path";

import type { Wallet } from "~/routes/wallets/types";

const walletDataFile = path.resolve("./data/wallets.json");

export function getWallets(userId: string) {
  const wallets = JSON.parse(fs.readFileSync(walletDataFile, "utf8")) as Record<
    string,
    Array<Wallet>
  >;

  return wallets[userId] ?? [];
}
