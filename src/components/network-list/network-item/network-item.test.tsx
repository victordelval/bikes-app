import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { networks } from "@/data/mocks";

import NetworkItem from "./network-item";

describe("<NetworkItem />", () => {
  it("renders network item", () => {
    render(<NetworkItem network={networks[0]} />);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders network name", () => {
    render(<NetworkItem network={networks[0]} />);
    expect(screen.getByText(/network 1/i)).toBeInTheDocument();
  });

  it("renders network location qith city and country", () => {
    render(<NetworkItem network={networks[0]} />);
    // expect(screen.getByText(/city 1, country 1/i)).toBeInTheDocument();
    expect(screen.getByText(/city 1/i)).toBeInTheDocument();
    expect(screen.getByText(/country 1/i)).toBeInTheDocument();
  });

  it("renders network companies", () => {
    render(<NetworkItem network={networks[0]} />);
    // expect(screen.getByText(/company 1, company 3/i)).toBeInTheDocument();
    expect(screen.getByText(/company 1/i)).toBeInTheDocument();
    expect(screen.getByText(/company 3/i)).toBeInTheDocument();
  });

  it("renders the details link", () => {
    render(<NetworkItem network={networks[0]} />);
    expect(screen.getByRole("link", { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /details/i })).toHaveAttribute(
      "href",
      "/network-1",
    );
  });
});
