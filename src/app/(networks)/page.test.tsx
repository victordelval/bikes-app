import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Layout from "./layout";
import Page from "./page";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("<NetworksPage />", () => {
  it("renders the layout with its children", () => {
    render(<Layout>{<div>children</div>}</Layout>);
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });

  it("renders the page with the title", async () => {
    const page = await Page({});
    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /discover bike networks/i,
      }),
    ).toBeInTheDocument();
  });
});
