import { Network } from "@/types/network";

import { getCountries } from "./countries";

const networksUrl = "http://api.citybik.es/v2/networks";


/**
 * All networks
 */

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

async function fetchNetworks(): Promise<NetworksDTO> {
  const res = await fetch(`${networksUrl}?fields=id,name,company,location`);

  if (!res.ok) {
    throw new Error("Failed to fetch networks");
  }

  return await res.json();
}

/**
 * Networks details: stations
 */

type StationsDTO = {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  latitude: number;
  longitude: number;
  timestamp: string;
};

type NetworkStationsDTO = {
  name: string;
  stations: StationsDTO[];
};

type NetworkDetailsDTO = { network: NetworkStationsDTO };

export type Station = {
  id: string;
  name: string;
  freeBikes: number;
  emptySlots: number;
  latitude: number;
  longitude: number;
  // timestamp: string;
};

type NetworkDetails = {
  name: string;
  stations: Station[];
};

export async function getNetworkDetailsById(
  id: string,
): Promise<NetworkDetails> {
  const networkDto = await fetchNetworkDetailsById(id);
  const { network } = networkDto;

  return {
    ...network,
    stations: network.stations.map((station) => ({
      id: station.id,
      name: station.name,
      freeBikes: station.free_bikes,
      emptySlots: station.empty_slots,
      latitude: station.latitude,
      longitude: station.longitude,
      // timestamp: station.timestamp,
    })),
  };
}

async function fetchNetworkDetailsById(id: string): Promise<NetworkDetailsDTO> {
  const res = await fetch(`${networksUrl}/${id}?fields=id,name,stations`);

  if (!res.ok) {
    throw new Error(`Failed to fetch network details with id: ${id}`);
  }

  return await res.json();
}
