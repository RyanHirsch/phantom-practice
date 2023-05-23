import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getWallets } from "~/utils/db.server";

import { Wallet } from "./types";

export type WalletContext = {
  wallets: Array<Wallet>;
};
export function loader() {
  return getWallets("me");
}

export default function WalletPage() {
  const wallets = useLoaderData<ReturnType<typeof loader>>();
  return (
    <div className="flex flex-col items-center">
      <div className="text-purple-600 font-bold text-lg tracking-tight">
        <Link to="/wallets">Wallets</Link>
      </div>
      <Outlet context={{ wallets } satisfies WalletContext} />
    </div>
  );
}
