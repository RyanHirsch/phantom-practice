import { Link } from "@remix-run/react";

import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div className="text-lg">
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="wallets">Wallets</Link>
        </li>
      </ul>
    </div>
  );
}
