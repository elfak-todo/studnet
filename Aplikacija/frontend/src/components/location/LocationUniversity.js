import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import uniIcon from "../../images/locationMarkers/univeristy.png";
import shadowIcon from "../../images/locationMarkers/shadow.png";

function LocationUniversity({ university }) {
  let icon = new L.icon({
    iconUrl: uniIcon,
    iconRetinaUrl: uniIcon,
    iconSize: [42, 42],
    iconAnchor: [12.5, 42],
    popupAnchor: [0, -42],
    shadowUrl: shadowIcon,
    shadowSize: [42, 42],
    shadowAnchor: [10, 41],
  });

  return (
    university && (
      <Marker
        position={[university.latitude, university.longitude]}
        icon={icon}
      >
        <Popup>
          {university.name} <br /> {university.city}
        </Popup>
      </Marker>
    )
  );
}

export default LocationUniversity;
