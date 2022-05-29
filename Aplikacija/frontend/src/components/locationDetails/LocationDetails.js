import React from "react";
import { Image, Tab, Tabs } from "react-bootstrap";

import "./LocationDetails.style.css";

function LocationDetails({ location }) {
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
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="details" title="Detalji">
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
          <Tab eventKey="comments" title="Komentari"></Tab>
          <Tab eventKey="events" title="Događaji"></Tab>
          <Tab eventKey="map" title="Mapa"></Tab>
        </Tabs>
      </div>
    )
  );
}

export default LocationDetails;
