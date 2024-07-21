import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("<NetworkDetailsPage />", () => {
  it("renders the page with the title", () => {
    render(<Page params={{ id: "network-1" }} />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /network-1/i,
      }),
    ).toBeInTheDocument();
  });
});
