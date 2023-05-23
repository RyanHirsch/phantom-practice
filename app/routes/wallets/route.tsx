import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { Wallet } from "./types";

export type WalletContext = {
  wallets: Array<Wallet>;
};
export function loader() {
  return [
    {
      source: "imported",
      chain: "SOL",
      address: "26XiuWDmXpj4btMCN8qJLM2Thik4BVU7VfA5orAUgQEF",
    },
    {
      iteration: 0,
      source: "generated",
      addresses: {
        SOL: "CR9gKkHk4HhESuC2gPiJ9pd3QBZLBZor1mwq83eMdDyd",
        ETH: "0x761e41a7010114e6b600F20F1e778171d3Cb0f9e",
        MATIC: "0x761e41a7010114e6b600F20F1e778171d3Cb0f9e",
      },
    },
  ] satisfies Array<Wallet>;
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
