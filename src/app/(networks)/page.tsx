import { Suspense } from "react";

import NetworkList from "@/components/network-list/network-list";
import NetworksSearch from "@/components/network-search/network-search";
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
  // TODO: country filter
  // const country = searchParams?.country || "";
  // TODO: pagination
  // const currentPage = Number(searchParams?.page) || 1;

  const networks = await getNetworks();

  const filteredNetworks = networks.filter((network) => {
    return (
      network.name.toLowerCase().includes(search.toLowerCase()) ||
      network.company.some((company) =>
        company.toLowerCase().includes(search.toLowerCase()),
      )
    );
  });
  // .filter((network) => {
  //   return country !== "" ? network.location.country.code === country : true;
  // });

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
        <div className="flex justify-between">
          <NetworksSearch />
          {/* <CountrySelector countries={countries} /> */}
        </div>
        <div className="h-auto overflow-scroll">
          <Suspense fallback={<div>Loading networks...</div>}>
            <NetworkList networks={filteredNetworks} />
          </Suspense>
        </div>
      </div>
      <div className="flex h-screen w-2/3 border-4 border-teal-400">
        Mapa
        {/* <Map data={filteredNetworks} /> */}
      </div>
    </>
  );
}
