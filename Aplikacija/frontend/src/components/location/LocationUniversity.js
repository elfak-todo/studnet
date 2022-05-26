import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

import uniIcon from "../../images/locationMarkers/univeristy.png";
import shadowIcon from "../../images/locationMarkers/shadow.png";

function LocationUniversity({ university }) {
  let icon = new L.icon({
    iconUrl: uniIcon,
    iconRetinaUrl: uniIcon,
    iconSize: [42, 42],
    iconAnchor: [12.5, 42],
    tooltipAnchor: [24, -21],
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
        <Tooltip>
          {university.name} <br /> {university.city}
        </Tooltip>
      </Marker>
    )
  );
}

export default LocationUniversity;
