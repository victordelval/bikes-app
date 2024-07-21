"use client";

import { useMemo } from "react";

import ReactMap, {
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";
import type { LayerProps } from "react-map-gl";

import { Network } from "@/types/network";

const layerStyle: LayerProps = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 4,
    "circle-color": "#f37b44",
    "circle-opacity": 0.6,
    "circle-stroke-color": "#f37b44",
  },
};

export default function Map({ data }: { data: Network[] }) {
  const geojson = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: data.map((network) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              network.location.longitude,
              network.location.latitude,
            ],
          },
        };
      }),
    };
  }, [data]);

  return (
    <ReactMap
      // reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1,
      }}
      mapStyle="mapbox://styles/mapbox/light-v10"
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-right" showCompass={false} />
      <Source id="bike-networks" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMap>
  );
}
