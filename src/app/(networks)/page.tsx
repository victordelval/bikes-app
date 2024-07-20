import Link from "next/link";

export default function NetworksPage() {
  return (
    <>
      <h1>Discover bike networks</h1>
      <Link href={`/${"bicimad"}`}>Details</Link>
    </>
  );
}
