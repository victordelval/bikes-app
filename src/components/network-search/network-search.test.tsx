import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NetworkSearch from "./network-search";

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

describe("<NetworkSearch />", () => {
  it("should render", () => {
    render(<NetworkSearch />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("should render a custom placeholder", () => {
    render(<NetworkSearch />);
    expect(screen.getByPlaceholderText(/search network/i)).toBeInTheDocument();
  });
});
