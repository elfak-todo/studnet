import React from "react";
import { Image, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./LocationDetails.style.css";
import locationTypes from "../location/LocationTypes.js";
import LocationMap from "../locationMap/LocationMap.js";

function LocationDetails({ location }) {
  console.log(location);

  const { t } = useTranslation(["locations"]);
  return (
    location && (
      <div>
        <div
          className="text-center testy py-5 mb-3"
          style={{
            backgroundImage: `url(${location.details.imagePath})`,
          }}
        >
          <h1 className="text-center test2">{location.details.name}</h1>
        </div>

        <Tabs
          defaultActiveKey="details"
          id="uncontrolled-tab-example"
          className="justify-content-center"
          onSelect={(key) => {
            if (key === "map") {
              window.dispatchEvent(new Event("resize"));
              window.scrollTo(0, document.body.scrollHeight);
            }
          }}
        >
          <Tab eventKey="details" title="Detalji" className="p-2 location-tab">
            <Image
              src={location.details.imagePath}
              alt="Slika događaja"
              style={{
                width: "48%",
                margin: "0 1%",
                borderRadius: "0.5em",
              }}
            />
          </Tab>
          <Tab
            eventKey="comments"
            title="Komentari"
            className="p-2 location-tab"
          ></Tab>
          <Tab
            eventKey="events"
            title="Događaji"
            className="p-2 location-tab"
          ></Tab>
          <Tab eventKey="map" title="Mapa" className="p-2 location-tab">
            <LocationMap selectedMode mapData={{ loc: [location.details] }} />
          </Tab>
        </Tabs>
      </div>
    )
  );
}

export default LocationDetails;
