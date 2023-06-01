import { Link, useOutletContext } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { Wallet } from "./wallets/types";

import type { WalletContext } from "./wallets/route";

function getDisplayName(wallet: Wallet): string {
  if (wallet.displayName) {
    return wallet.displayName;
  }

  if (wallet.source === "generated") {
    return `Wallet ${wallet.iteration}`;
  }

  return `${wallet.address.substring(0, 4)}...${wallet.address.substring(
    wallet.address.length - 5
  )}`;
}
export default function WalletsIndexPage() {
  const { wallets } = useOutletContext<WalletContext>();
  if (!wallets.length) {
    return <div className="text-purple-300">You have no wallets</div>;
  }
  return (
    <>
      <ul>
        {wallets.map((w) => (
          <li key={getDisplayName(w)}>
            <Link to={`${w.source === "imported" ? w.address : w.addresses.SOL}`}>
              {getDisplayName(w)}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="new"
        className="rounded mt-4 w-full text-center px-2 py-1 border border-transparent bg-purple-500 hover:bg-purple-700 hover:border-purple-600 text-neutral-50 flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5 mx-1" />
        New
      </Link>
    </>
  );
}
