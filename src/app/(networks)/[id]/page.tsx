import Link from "next/link";

import StationsMap from "@/components/stations-map/stations-map";
import StationsTable from "@/components/stations-table/stations-table";
import { getNetworkDetailsById, getNetworks } from "@/data/networks";

type Props = {
  params: { id: string };
};

export default async function NetworkDetailsPage({ params }: Props) {
  const allNetworks = await getNetworks();
  const network = allNetworks.find((network) => network.id === params.id);

  if (!network) {
    return <div>Network not found</div>;
  }

  const networkDetails = await getNetworkDetailsById(params.id);

  return (
    <main className="flex">
      <div className="flex w-1/3 flex-col space-y-6 p-6 lg:min-w-[551px]">
        <Link href="/">Go back home</Link>
        <h1 className="text-3xl">{networkDetails.name}</h1>
        <p>
          {network.location.city}, {network.location.country.name}
        </p>
        <p>{network.company.join(",")}</p>
        <p>{`All ${networkDetails.stations.length} stations`}</p>
        <div className="h-auto overflow-y-auto">
          <StationsTable stations={networkDetails.stations} />
        </div>
      </div>
      <div className="flex h-screen w-2/3">
        <StationsMap network={network} stations={networkDetails.stations} />
      </div>
    </main>
  );
}
