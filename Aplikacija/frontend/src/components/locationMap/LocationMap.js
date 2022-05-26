import { MapContainer, TileLayer } from "react-leaflet";

import "./LocationMap.style.css";
import Location from "../location/Location.js";
import LocationUniversity from "../location/LocationUniversity.js";
import { useState } from "react";
import LocationCard from "../locationCard/LocationCard.js";

function LocationMap({ mapData }) {
  const [openedLocation, setOpenedLocation] = useState(null);

  return (
    mapData && (
      <div className="map-container">
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
            <Location
              location={l}
              key={l.id}
              setOpenedLocation={setOpenedLocation}
            />
          ))}
        </MapContainer>
        <LocationCard
          openedLocation={openedLocation}
          setOpenedLocation={setOpenedLocation}
        />
      </div>
    )
  );
}

export default LocationMap;
