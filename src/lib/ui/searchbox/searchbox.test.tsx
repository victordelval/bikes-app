import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SearchBox from "./searchbox";

describe("<SearchBox />", () => {
  it("renders correctly", () => {
    render(<SearchBox />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders a placeholder by default", () => {
    render(<SearchBox />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});
