import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Network } from "@/types/network";

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

const mockMap = vi.fn();

vi.mock("@/components/networks-map/networks-map", () => ({
  default: (props: { data: Network[] }) => {
    mockMap(props);
    return <div>Networks Map</div>;
  },
}));

describe("<NetworksPage />", () => {
  it("renders the layout with its children", () => {
    render(<Layout>{<div>children</div>}</Layout>);
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });

  it("renders the page with the main title", async () => {
    const page = await Page({});
    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /discover bike networks/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders a total of 790 networks", async () => {
    const page = await Page({});
    render(page);

    await waitFor(() => {
      const networkList = screen.getAllByRole("list")[0];
      expect(within(networkList).getAllByRole("listitem")).toHaveLength(790);
    });
  });

  it("renders filtered network list by url search param, with 1 network", async () => {
    const page = await Page({
      searchParams: { search: "bicimad", country: "", page: "" },
    });
    render(page);

    await waitFor(async () => {
      const networkList = (await screen.findAllByRole("list"))[0];
      expect(within(networkList).getAllByRole("listitem")).toHaveLength(1);
    });
  });

  it.skip("renders filtered network list by typing in searchbox, with 1 network", async () => {
    const user = userEvent.setup();

    const page = await Page({});
    render(page);

    await waitFor(async () => {
      const searchbox = screen.getAllByRole("searchbox")[0];
      expect(searchbox).toBeDefined();
      await user.type(searchbox, " bicim");

      // TODO: not finding the new filtered list, but the initial one
      // expect(
      //   screen.getAllByText("total networks: 790", { exact: false })[0],
      // ).toBeInTheDocument();
      // expect(screen.getAllByLabelText("total-networks")[0]).toHaveTextContent(/790/i)
      // expect(
      //   screen.getAllByText("total networks: 1", { exact: false })[0],
      // ).toBeInTheDocument();
      // screen.debug(screen.getAllByRole('list')[0]);
      // const networkList = screen.getAllByRole('list')[0];
      // expect(within(networkList).getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it("renders filtered network list by url country param with, 66 networks", async () => {
    const page = await Page({
      searchParams: { search: "", country: "ES", page: "" },
    });
    render(page);

    await waitFor(async () => {
      const networkList = (await screen.findAllByRole("list"))[0];
      expect(within(networkList).getAllByRole("listitem")).toHaveLength(66);
    });
  });

  it.skip("renders filtered network list by selecting a country, with 66 networks", async () => {
    const user = userEvent.setup();
    const page = await Page({});
    render(page);

    await waitFor(async () => {
      const countrySelector = screen.getAllByRole("button", {
        name: /country/i,
      })[0];
      await user.click(countrySelector);

      const countryList = screen.getAllByRole("listbox")[0];
      const countryOption = within(countryList).getByText(/spain/i);
      expect(countryOption).toBeInTheDocument();
      await user.click(countryOption);

      // TODO: not finding the new filtered list, but the initial one
      // const networkList = (await screen.findAllByRole('list'))[0];
      // // const networkList = await screen.findAllByRole('list');
      // // console.log(networkList.length);
      // screen.debug(networkList);
      // expect(await within(networkList).findAllByRole("listitem")).toHaveLength(
      //   66,
      // );
    });
  });

  it("renders filtered country options in filter dropdown", async () => {
    const user = userEvent.setup();
    const page = await Page({});
    render(page);

    await waitFor(async () => {
      const countrySelector = screen.getAllByRole("button", {
        name: /country/i,
      })[0];
      await user.click(countrySelector);

      // total contries with some networks
      const countryListInitial = screen.getAllByRole("listbox")[0];
      expect(within(countryListInitial).getAllByRole("listitem")).toHaveLength(
        57,
      );

      const countrySearhcbox = screen.getByPlaceholderText(/search country/i);
      await user.type(countrySearhcbox, "spain");

      const countryList = screen.getAllByRole("listbox")[0];
      expect(within(countryList).getAllByRole("listitem")).toHaveLength(1);
      expect(within(countryList).getByRole("listitem")).toHaveTextContent(
        /spain/i,
      );
    });
  });

  it("calls the networks map component to render", async () => {
    const page = await Page({});
    render(page);

    await waitFor(async () => {
      expect(mockMap).toHaveBeenCalled();
    });
  });
});
