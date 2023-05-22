import { render, screen } from "@testing-library/react";

import { Test } from "../Test";

test("displays test component", async () => {
  render(<Test />);

  expect(screen.queryByTestId("test")).toHaveTextContent("TEST CONTENT");
});
