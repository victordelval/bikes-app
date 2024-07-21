"use client";

import { useMemo, useState } from "react";

import { MapEvent } from "mapbox-gl";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

import { Network } from "@/types/network";
import { Station } from "@/types/station";

import Pin from "./pin/pin";

type Props = {
  network: Network;
  stations: Station[];
};

export default function StationsMap({ network, stations }: Props) {
  const [popupInfo, setPopupInfo] = useState<Station | null>(null);

  const pins = useMemo(
    () =>
      stations.map((station) => (
        <Marker
          key={`marker-${station.id}`}
          longitude={station.longitude}
          latitude={station.latitude}
          anchor="top"
          // @ts-ignore
          onClick={(e: MapEvent & { originalEvent: MouseEvent }) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(station);
          }}
        >
          <Pin />
        </Marker>
      )),
    [stations],
  );

  return (
    <Map
      //   reuseMaps
      initialViewState={{
        latitude: network.location.latitude,
        longitude: network.location.longitude,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-right" showCompass={false} />
      {pins}
      {popupInfo && (
        <Popup
          anchor="bottom"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="p-6">
            <h3>{popupInfo.name}</h3>
            <p>Free Bikes: {popupInfo.freeBikes}</p>
            <p>Empty Slots: {popupInfo.emptySlots}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
