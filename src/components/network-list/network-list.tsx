import { Network } from "@/types/network";

import NetworkItem from "./network-item/network-item";

type NetworkListProps = {
  networks: Network[];
};

export default function NetworkList({ networks }: NetworkListProps) {
  return (
    <ul role="list" aria-label="network-list">
      {networks.map((network) => (
        <NetworkItem key={network.id} network={network} />
      ))}
    </ul>
  );
}
