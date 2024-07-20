import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { networks } from "@/data/mocks";

import NetworkList from "./network-list";

describe("NetworkList", () => {
  test("renders network list", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders list items", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("renders item title", () => {
    render(<NetworkList networks={networks} />);
    expect(screen.getByText("Network 1")).toBeInTheDocument();
  });
});
