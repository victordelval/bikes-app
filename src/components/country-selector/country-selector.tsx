"use client";

import React, { useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Selector from "@/lib/ui/selector/selector";
import { Country } from "@/types/country";
import { Network } from "@/types/network";

type Props = {
  countries: Country[];
  networks: Network[];
};

export default function CountrySelector({ countries, networks }: Props) {
  const searchParams = useSearchParams();
  const countryParam = searchParams?.get("country");
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState("");

  const onSelection = (countryCode: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (countryCode && countryCode !== countryParam) {
      params.set("country", countryCode);
    } else {
      params.delete("country");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const filteredCountries = useMemo(
    () =>
      countries
        .filter((country) =>
          networks.some(
            (network) => network.location.country.code === country.code,
          ),
        )
        .filter(
          (country) =>
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.code.toLowerCase().includes(search.toLowerCase()),
        )
        .map((country) => ({ ...country, value: country.code })),
    [countries, networks, search],
  );

  return (
    <Selector
      label="Country"
      items={filteredCountries}
      search={search}
      onSearch={setSearch}
      onSelection={onSelection}
      selected={countryParam ?? undefined}
      showArrow={false}
      startIcon={<i>{"->"}</i>}
    />
  );
}
