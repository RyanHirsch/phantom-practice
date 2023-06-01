import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getWallets } from "~/utils/flat-db.server";
import { notFound } from "~/utils/request.server";
import { getUser } from "~/utils/user.server";
import { getSolBalance } from "~/utils/sol.server";

import { Wallet } from "./wallets/types";

function findWallet(wallets: Array<Wallet>, address: string | undefined) {
  if (!address) {
    return undefined;
  }

  return wallets.find((x) =>
    x.source === "imported" ? address === x.address : Object.values(x.addresses).includes(address)
  );
}

function getSolAddress(wallet: Wallet) {
  return wallet.source === "imported" ? wallet.address : wallet.addresses.SOL;
}

export async function loader({ params }: LoaderArgs) {
  const user = await getUser();
  const wallets = getWallets(user.id);
  const selectedWallet = findWallet(wallets, params.address);

  if (!selectedWallet) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFound({ message: `Not Found`, wallet: params.address });
  }

  return {
    selectedWallet,
    balance: await getSolBalance(getSolAddress(selectedWallet)),
  };
}

// type FetchingState = "idle" | "loading" | "loaded" | "error" | "reloading";

export default function WalletsWalletDetailsPage() {
  const { selectedWallet, balance } = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  // const params = useParams();
  // const [walletData, setWalletData] = useState<null | Wallet>(null);
  // const [fetchingState, setFetchingState] = useState<FetchingState>("idle");

  // useEffect(() => {
  //   (async () => {
  //     setFetchingState((currentState) => {
  //       return currentState === "loaded" ? "reloading" : "loading";
  //     });
  //     const response = await fetch(`/wallets?_data=${encodeURI("routes/wallets")}`, {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     });
  //     if (response.status < 400) {
  //       const wallets = (await response.json()) as Wallet[];
  //       const found = findWallet(wallets, params.address);
  //       if (found) {
  //         setWalletData(found);
  //         setFetchingState("loaded");
  //         return;
  //       }
  //     }

  //     setFetchingState("error");
  //   })();
  // }, [setWalletData, setFetchingState, params.address]);

  return (
    <div>
      Hi from wallet details
      <pre>{JSON.stringify({ selectedWallet, balance }, null, 2)}</pre>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div>
      Failed to get that wallet, refresh or go back to <Link to="/wallets">all wallets</Link>
    </div>
  );
}
