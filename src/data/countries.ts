import { promises as fs } from "fs";

import { Country } from "@/types/country";

const countriesUrl = "/src/data/countries.json";

type CountryDTO = {
  name: string;
  code: string;
};

type CountriesDTO = {
  data: CountryDTO[];
};

export async function getCountries(): Promise<Country[]> {
  const countriesDto = await fetchCountries();
  return countriesDto.data;
}

async function fetchCountries(): Promise<CountriesDTO> {
  const file = await fs.readFile(process.cwd() + countriesUrl, "utf8");

  if (!file) {
    throw new Error("Failed to fetch countries");
  }

  return JSON.parse(file);
}
