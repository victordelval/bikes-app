import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Page from "./page";

describe("Network details page", () => {
  test("renders the page with the title", () => {
    render(<Page params={{ id: "network-1" }} />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /network-1/i,
      }),
    ).toBeInTheDocument();
  });
});
