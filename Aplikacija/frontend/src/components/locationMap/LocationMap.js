import { MapContainer, TileLayer } from "react-leaflet";

import "./LocationMap.style.css";
import LocationMarker from "../locationMarker/LocationMarker.js";
import LocationUniversity from "../locationMarker/LocationUniversity.js";
import { useEffect, useState } from "react";
import LocationCard from "../locationCard/LocationCard.js";

function LocationMap({
  mapData,
  selectedMode = false,
  selectMode = false,
  showCards = true,
  onLocationSelected,
}) {
  const [openedLocation, setOpenedLocation] = useState(null);

  return (
    mapData && (
      <div className="map-container">
        <MapContainer
          className="map"
          center={
            selectedMode
              ? [mapData.loc[0].latitude, mapData.loc[0].longitude]
              : [mapData.uni.latitude, mapData.uni.longitude]
          }
          zoom={13}
          scrollWheelZoom={false}
          placeholder={<div className="map"></div>}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!selectedMode && mapData.uni && (
            <LocationUniversity university={mapData.uni} />
          )}
          {mapData.loc.map((l) => (
            <LocationMarker
              location={l}
              key={l.id}
              setOpenedLocation={setOpenedLocation}
            />
          ))}
        </MapContainer>
        {showCards && (
          <LocationCard
            openedLocation={openedLocation}
            setOpenedLocation={setOpenedLocation}
            selectMode={selectMode}
            onLocationSelected={onLocationSelected}
          />
        )}
      </div>
    )
  );
}

export default LocationMap;
