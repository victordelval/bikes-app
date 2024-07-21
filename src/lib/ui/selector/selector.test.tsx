import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { countries } from "@/data/mocks";

import Selector from "./selector";

describe("<Selector />", () => {
  it("renders correctly", () => {
    render(
      <Selector
        label="Country"
        items={[]}
        search=""
        onSearch={() => {}}
        onSelection={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /country/i }),
    ).toBeInTheDocument();
  });

  it("shows the dropdown options when the button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Selector
        label="Country"
        items={countries.map((country) => ({
          ...country,
          value: country.code,
        }))}
        search=""
        onSearch={() => {}}
        onSelection={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /country/i });
    await user.click(button);

    const options = screen.getByRole("listbox");
    expect(within(options).getAllByRole("listitem")).toHaveLength(
      countries.length,
    );
  });

  it.skip("filters the dropdown options when the searching by country name", async () => {
    const user = userEvent.setup();
    render(
      <Selector
        label="Country"
        items={countries.map((country) => ({
          ...country,
          value: country.code,
        }))}
        search=""
        onSearch={() => {}}
        onSelection={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /country/i });
    await user.click(button);

    const searchbox = screen.getByPlaceholderText(/search country/i);
    await user.type(searchbox, "country 1");

    const options = await screen.findByRole("listbox");
    // screen.debug(await within(options).findAllByRole("listitem"), 999999999);
    expect(await within(options).findAllByRole("listitem")).toHaveLength(1);
    expect(
      await within(options).findAllByRole("listitem", { name: /country 1/i }),
    ).toBeInTheDocument();
  });
});
