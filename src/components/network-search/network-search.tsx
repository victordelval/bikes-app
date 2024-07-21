"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "@/lib/ui/searchbox/searchbox";

export default function NetworkSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <SearchBox
      // label="Search"
      placeholder="Search network"
      value={searchParams.get("search")?.toString()}
      onChange={(e: React.ChangeEventHandler<HTMLInputElement>) =>
        // @ts-ignore
        handleSearch(e.target.value)
      }
    />
  );
}
