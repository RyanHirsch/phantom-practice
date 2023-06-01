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

function saveWallets(userId: string, wallets: Array<Wallet>) {
  const existingWallets = JSON.parse(fs.readFileSync(walletDataFile, "utf8")) as Record<
    string,
    Array<Wallet>
  >;

  fs.writeFileSync(
    walletDataFile,
    JSON.stringify({ ...existingWallets, [userId]: wallets }, null, 2),
    "utf8"
  );

  return wallets;
}

export function createWallet(userId: string, wallet: Wallet) {
  const existingWallets = getWallets(userId);

  return saveWallets(userId, [...existingWallets, wallet]);
}
