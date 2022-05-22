import { MapContainer, TileLayer } from "react-leaflet";

import "./LocationMap.css";
import Location from "../location/Location.js";
import LocationUniversity from "../location/LocationUniversity.js";

function LocationMap({ mapData }) {
  return (
    mapData && (
      <MapContainer
        id="map"
        center={[mapData.uni.latitude, mapData.uni.longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationUniversity university={mapData.uni} />
        {mapData.loc.map((l) => (
          <Location location={l} key={l.id} />
        ))}
      </MapContainer>
    )
  );
}

export default LocationMap;
