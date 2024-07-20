import { Country } from "./country";

export type Network = {
  id: string;
  name: string;
  company: string[];
  location: {
    city: string;
    country: Country;
    latitude: number;
    longitude: number;
  };
};
