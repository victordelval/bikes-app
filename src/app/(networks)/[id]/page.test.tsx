import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Network } from "@/types/network";
import { Station } from "@/types/station";

import Page from "./page";

const mockMap = vi.fn();

vi.mock("@/components/stations-map/stations-map", () => ({
  default: (props: { networks: Network[]; stations: Station[] }) => {
    mockMap(props);
    return <div>Networks Map</div>;
  },
}));

describe("<NetworkDetailsPage />", () => {
  it("renders the page with the main title", async () => {
    const page = await Page({ params: { id: "bicimad" } });
    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /bicimad/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders a total of 609 stations", async () => {
    const page = await Page({ params: { id: "bicimad" } });
    render(page);

    await waitFor(() => {
      expect(screen.getByText(/all 609 stations/i)).toBeInTheDocument();
    });
  });
});
