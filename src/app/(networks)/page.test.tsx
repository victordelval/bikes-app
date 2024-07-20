import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Layout from "./layout";
import Page from "./page";

describe("Networks page", () => {
  test("renders the layout with its children", () => {
    render(<Layout>{<div>children</div>}</Layout>);
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });

  test("renders the page with the title", async () => {
    const page = await Page();
    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /discover bike networks/i,
      }),
    ).toBeInTheDocument();
  });
});
