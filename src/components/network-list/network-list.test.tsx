import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { networks } from "@/data/mocks";

import NetworkList from "./network-list";

describe("<NetworkList />", () => {
  it("renders network list", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders list items", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders item title", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getByText("Network 1")).toBeInTheDocument();
  });
});
