import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./LocationDetails.style.css";

import LocationMap from "../locationMap/LocationMap.js";

import LocationDetailsComments from "./grades/LocationDetailsGrades.js";
import LocationDetailsDetails from "./details/LocationDetailsDetails.js";
import LocationDetailsEvents from "./events/LocationDetailsEvents.js";

function LocationDetails({ location }) {
  const { t } = useTranslation(["locations"]);
  return (
    location && (
      <div>
        <div
          className="text-center testy mb-3"
          style={{
            backgroundImage: `url(${location.details.imagePath})`,
          }}
        >
          <h1 className="text-center py-5 test2">{location.details.name}</h1>
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
          <Tab
            eventKey="details"
            title={t("details")}
            className="p-2 location-tab"
          >
            <LocationDetailsDetails location={location} />
          </Tab>
          <Tab
            eventKey="grades"
            title={`${t("grades")} (${location.grades.length})`}
            className="p-2 location-tab"
          >
            <LocationDetailsComments location={location} />
          </Tab>
          <Tab
            eventKey="events"
            title={`${t("events")} (${location.events.length})`}
            className="p-2 location-tab"
          >
            <LocationDetailsEvents location={location} />
          </Tab>
          <Tab eventKey="map" title={t("map")} className="p-2 location-tab">
            <LocationMap selectedMode mapData={{ loc: [location.details] }} />
          </Tab>
        </Tabs>
      </div>
    )
  );
}

export default LocationDetails;
