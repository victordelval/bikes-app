import { Country } from "@/types/country";
import { Network } from "@/types/network";

export const networks: Network[] = [
  {
    id: "network-1",
    name: "Network 1",
    location: {
      city: "City 1",
      country: {
        name: "Country 1",
        code: "C1",
      },
      latitude: 41,
      longitude: -2,
    },
    company: ["Company 1", "Company 3"],
  },
  {
    id: "network-2",
    name: "Network 2",
    location: {
      city: "City 2",
      country: {
        name: "Country 2",
        code: "C2",
      },
      latitude: 42,
      longitude: -3,
    },
    company: ["Company 2"],
  },
];

export const countries: Country[] = [
  { code: "C1", name: "Country 1" },
  { code: "C2", name: "Country 2" },
];
