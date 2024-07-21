import { Suspense } from "react";

import CountrySelector from "@/components/country-selector/country-selector";
import NetworkList from "@/components/network-list/network-list";
import NetworksSearch from "@/components/network-search/network-search";
import NetworksMap from "@/components/networks-map/networks-map";
import { getCountries } from "@/data/countries";
import { getNetworks } from "@/data/networks";

type Props = {
  searchParams?: {
    search?: string;
    country?: string;
    page?: string;
  };
};

export default async function NetworksPage({ searchParams }: Props) {
  const search = searchParams?.search || "";
  const country = searchParams?.country || "";
  // TODO: pagination
  // const currentPage = Number(searchParams?.page) || 1;

  const networks = await getNetworks();
  const countries = await getCountries();

  const filteredNetworks = networks
    .filter((network) => {
      return (
        network.name.toLowerCase().includes(search.toLowerCase()) ||
        network.company.some((company) =>
          company.toLowerCase().includes(search.toLowerCase()),
        )
      );
    })
    .filter((network) => {
      return country !== "" ? network.location.country.code === country : true;
    });

  return (
    <>
      <div className="flex w-1/3 flex-col space-y-6 p-6">
        <p className="flex text-3xl">CycleMap</p>
        <h1 className="text-2xl">Discover bike networks</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing placerat
          turpis magna sem tempor amet faucibus. Arcu praesent viverra
          pellentesque nisi quam in rhoncus.
        </p>
        <p
          aria-label="total-networks"
          className="hidden"
        >{`total networks: ${filteredNetworks.length}`}</p>
        <div className="flex justify-between gap-6">
          <NetworksSearch />
          <CountrySelector countries={countries} networks={networks} />
        </div>
        <div className="h-auto overflow-y-auto">
          <Suspense fallback={<div>Loading networks...</div>}>
            <NetworkList networks={filteredNetworks} />
          </Suspense>
        </div>
      </div>
      <div className="flex h-screen w-2/3">
        <NetworksMap networks={filteredNetworks} />
      </div>
    </>
  );
}
