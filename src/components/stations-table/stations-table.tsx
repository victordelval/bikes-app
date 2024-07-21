import { type Station } from "@/types/station";

type Props = {
  stations: Station[];
};

export default function StationsTable({ stations }: Props) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-1/3">Station Name</th>
          <th className="w-1/3">Free Bikes</th>
          <th className="w-1/3">Empty Slots</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station) => (
          <tr key={station.id}>
            <td>{station.name}</td>
            <td>{station.freeBikes}</td>
            <td>{station.emptySlots}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
