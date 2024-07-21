import { Network } from "@/types/network";

import NetworkItem from "./network-item/network-item";

type NetworkListProps = {
  networks: Network[];
};

export default function NetworkList({ networks }: NetworkListProps) {
  if (networks.length === 0) {
    return <p>No networks found</p>;
  }

  return (
    <ul role="list" aria-label="network-list" className="space-y-4 divide-y">
      {networks.map((network) => (
        <NetworkItem key={network.id} network={network} />
      ))}
    </ul>
  );
}
