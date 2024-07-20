import NetworkList from "@/components/network-list/network-list";
import { getNetworks } from "@/data/networks";

export default async function NetworksPage() {
  const networks = await getNetworks();

  return (
    <>
      <h1>Discover bike networks</h1>
      <NetworkList networks={networks} />
    </>
  );
}
