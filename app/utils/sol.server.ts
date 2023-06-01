import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

let lazyConnection: Connection | undefined;

function ensureConnection(): Connection {
  if (!lazyConnection) {
    lazyConnection = new Connection("https://api.mainnet-beta.solana.com");
  }

  return lazyConnection;
}

export async function getSolBalance(address: string) {
  const connection = ensureConnection();

  const balance = await connection.getBalance(new PublicKey(address), {
    commitment: "confirmed",
  });

  return balance / LAMPORTS_PER_SOL;
}
