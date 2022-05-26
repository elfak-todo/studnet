import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";

import locationTypes from "./LocationTypes.js";
import shadowIcon from "../../images/locationMarkers/shadow.png";

import "./Location.css";

function Location({ location, setOpenedLocation }) {
  const { t } = useTranslation(["locations"]);

  let icon = new L.icon({
    ...locationTypes[location.type].icon,
    iconSize: [38, 38],
    iconAnchor: [18.5, 38],
    popupAnchor: [0, -38],
    tooltipAnchor: [15, -19],
    shadowUrl: shadowIcon,
    shadowSize: [38, 38],
    shadowAnchor: [16, 37],
    className: "map-location-icon",
  });

  return (
    location && (
      <Marker
        position={[location.latitude, location.longitude]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            setOpenedLocation(location);
          },
        }}
      >
        <Tooltip>
          {location.name} <br /> {t(locationTypes[location.type].name)}
        </Tooltip>
      </Marker>
    )
  );
}

export default Location;
