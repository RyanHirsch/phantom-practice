import { Form } from "@remix-run/react";
import classNames from "classnames";

export default function NewWalletRoute() {
  return (
    <Form className="flex flex-col space-y-4 w-full">
      <label htmlFor="displayName" className="flex flex-col mx-6">
        Name:
        <input id="displayName" type="text" name="displayName" className="w-full" />
      </label>

      <label htmlFor="privateKey" className="flex flex-col mx-6">
        Private Key:
        <textarea id="privateKey" rows={3} name="privateKey" />
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
