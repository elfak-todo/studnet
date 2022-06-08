import React, { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import "./AddLocationMap.style.css";
import locationTypes from "../../locationMarker/LocationTypes";
import addLocationIcon from "../../../images/locationMarkers/add-location.png";
import shadowIcon from "../../../images/locationMarkers/shadow.png";

function AddLocationMap({ location, setLocation, state }) {
  const markerRef = useRef(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const i =
      location.type && Number(location.type) !== -1
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
  }, [location]);

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
    <div className="add-location-map-container">
      <MapContainer
        className="add-location-map"
        center={[location.latitude, location.longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
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
  );
}

export default AddLocationMap;
