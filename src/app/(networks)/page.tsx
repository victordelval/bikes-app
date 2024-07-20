import NetworkList from "@/components/network-list/network-list";
import { networks } from "@/data/mocks";

export default function NetworksPage() {
  return (
    <>
      <h1>Discover bike networks</h1>
      <NetworkList networks={networks} />
    </>
  );
}
