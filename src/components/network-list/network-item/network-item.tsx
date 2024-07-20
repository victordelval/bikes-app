import Link from "next/link";

import { Network } from "@/types/network";

type NetworkItemProps = {
  network: Network;
};

export default function NetworkItem({ network }: NetworkItemProps) {
  return (
    <li role="listitem" className="flex justify-between">
      <div className="flex flex-col">
        <h3 className="text-xl">{network.name}</h3>
        <p>
          {network.location.city}, {network.location.country.name}
        </p>
        <p>{network.company.join(", ")}</p>
      </div>
      <div className="flex flex-col justify-end">
        <Link href={`/${network.id}`}>Details</Link>
      </div>
    </li>
  );
}
