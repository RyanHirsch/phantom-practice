import { Form, useOutletContext } from "@remix-run/react";
import classNames from "classnames";
import { ActionArgs } from "@remix-run/node";

import { WalletContext } from "./wallets/route";

function validateWalletName(name: string) {
  if (name.length < 3) {
    return "That wallet name is too short";
  }
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");
  if (typeof content !== "string" || typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fieldErrors = {
    name: validateWalletName(name),
  };
  const fields = { content, name };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const joke = await db.joke.create({
    data: { ...fields, jokesterId: userId },
  });
  return redirect(`/jokes/${joke.id}`);
}

export default function NewWalletRoute() {
  const { wallets } = useOutletContext<WalletContext>();

  return (
    <Form className="flex flex-col space-y-4 w-full">
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
