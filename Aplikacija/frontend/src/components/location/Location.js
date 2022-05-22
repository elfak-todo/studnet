import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";

import locationTypes from "./LocationTypes.js";
import shadowIcon from "../../images/locationMarkers/shadow.png";

import "./Location.css";

function Location({ location }) {
  const { t } = useTranslation(["locations"]);

  let icon = new L.icon({
    ...locationTypes[location.type].icon,
    iconSize: [38, 38],
    iconAnchor: [18.5, 38],
    popupAnchor: [0, -38],
    shadowUrl: shadowIcon,
    shadowSize: [38, 38],
    shadowAnchor: [16, 37],
    className: "map-location-icon",
  });

  return (
    location && (
      <Marker position={[location.latitude, location.longitude]} icon={icon}>
        <Popup>
          {location.name} <br /> {t(locationTypes[location.type].name)}
        </Popup>
      </Marker>
    )
  );
}

export default Location;
