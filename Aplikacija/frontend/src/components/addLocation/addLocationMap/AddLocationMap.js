import React, { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import "./AddLocationMap.style.css";
import locationTypes from "../../locationMarker/LocationTypes";
import addLocationIcon from "../../../images/locationMarkers/add-location.png";
import shadowIcon from "../../../images/locationMarkers/shadow.png";
import ChangeView from "./ChangeView";

function AddLocationMap({
  location,
  setLocation,
  state,
  wideMode = false,
  smallHeight = false,
}) {
  const markerRef = useRef(null);
  const [icon, setIcon] = useState(null);

  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    setZoom(wideMode ? 9 : 13);
  }, [wideMode]);

  useEffect(() => {
    const i =
      location.type !== undefined &&
      location.type !== null &&
      Number(location.type) !== -1
        ? locationTypes[location.type].icon
        : {
            iconUrl: addLocationIcon,
            iconRetinaUrl: addLocationIcon,
          };

    setIcon(
      new L.icon({
        ...i,
        iconSize: [38, 38],
        iconAnchor: [18.5, 38],
        popupAnchor: [0, -38],
        tooltipAnchor: [15, -19],
        shadowUrl: shadowIcon,
        shadowSize: [38, 38],
        shadowAnchor: [16, 37],
        className: "map-location-icon",
      })
    );

    setCenter([location.latitude, location.longitude]);
  }, [location, setCenter]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLocation((l) => {
            return { ...l, latitude: lat, longitude: lng };
          });
        }
      },
    }),
    [setLocation]
  );

  return (
    location &&
    center && (
      <div
        className={`add-location-map-container ${
          smallHeight ? "map-small" : ""
        }`}
      >
        <MapContainer
          className="add-location-map"
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <ChangeView center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {icon && (
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={[location.latitude, location.longitude]}
              ref={markerRef}
              icon={icon}
            />
          )}
        </MapContainer>
      </div>
    )
  );
}

export default AddLocationMap;
