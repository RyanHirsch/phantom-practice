import { Form } from "@remix-run/react";
import classNames from "classnames";
import { ActionArgs, redirect } from "@remix-run/node";

import { badRequest } from "~/utils/request.server";
import { createWallet, getWallets } from "~/utils/flat-db.server";

import { Wallet } from "./wallets/types";

function validateWalletName(name: string, existingNames: string[]) {
  if (existingNames.includes(name)) {
    return "That wallet name already taken";
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const pubKey = form.get("publicKey");
  const name = form.get("displayName");
  if (typeof pubKey !== "string" || typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fieldErrors = {
    name: validateWalletName(
      name,
      getWallets("me")
        .map((w) => w.displayName)
        .filter(Boolean) as string[]
    ),
  };
  const wallet = {
    source: "imported",
    chain: "SOL",
    address: pubKey,
    ...(name ? { displayName: name } : undefined),
  } satisfies Wallet;

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields: { name, pubKey },
      formError: null,
    });
  }

  createWallet("me", wallet);
  return redirect(`/wallets/${wallet.address}`);
}

export default function NewWalletRoute() {
  // plan to use for client side wallet name error handling
  // const { wallets } = useOutletContext<WalletContext>();

  return (
    <Form className="flex flex-col space-y-4 w-full" method="POST">
      <label htmlFor="displayName" className="flex flex-col mx-6">
        Name:
        <input id="displayName" type="text" name="displayName" className="w-full" />
      </label>

      <label htmlFor="publicKey" className="flex flex-col mx-6">
        Public Key:
        <textarea id="publicKey" rows={3} name="publicKey" />
      </label>
      <button
        type="submit"
        className={classNames(
          "rounded mx-6 mt-4 text-center px-2 py-1 border border-transparent bg-purple-500 text-neutral-50 flex items-center justify-center",
          "hover:bg-purple-700 hover:border-purple-600"
        )}
      >
        Import Wallet
      </button>
    </Form>
  );
}
