import { Network } from "@/types/network";

import { getCountries } from "./countries";

const networksUrl = "http://api.citybik.es/v2/networks";

export type NetworkDTO = {
  id: string;
  name: string;
  company: string[];
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
};

type NetworksDTO = { networks: NetworkDTO[] };

export async function getNetworks(): Promise<Network[]> {
  const countries = await getCountries();

  const networksDto = await fetchNetworks();
  const { networks } = networksDto;

  return networks.map((network) => ({
    ...network,
    location: {
      ...network.location,
      country: {
        name:
          countries.find((country) => country.code === network.location.country)
            ?.name || network.location.country,
        code: network.location.country,
      },
    },
  }));
}

export async function fetchNetworks(): Promise<NetworksDTO> {
  const res = await fetch(`${networksUrl}?fields=id,name,company,location`);

  if (!res.ok) {
    throw new Error("Failed to fetch networks");
  }

  return await res.json();
}
