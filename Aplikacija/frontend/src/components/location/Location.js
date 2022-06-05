import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Location.style.css";

import LocationMap from "../locationMap/LocationMap.js";

import LocationGrades from "./grades/LocationGrades.js";
import LocationDetails from "./details/LocationDetails.js";
import LocationEvents from "./events/LocationEvents.js";

function Location({ location }) {
  const { t } = useTranslation(["locations"]);

  const [openedTab, setOpenedTab] = useState("details");

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
              window.scrollTo(0, document.body.scrollHeight + 300);
            }
            setOpenedTab(key);
          }}
        >
          <Tab
            eventKey="details"
            title={t("details")}
            className="p-2 location-tab"
            tabClassName="profile-feed-tab"
          >
            {openedTab === "details" && <LocationDetails location={location} />}
          </Tab>
          <Tab
            eventKey="grades"
            title={`${t("grades")} (${location.grades.length})`}
            className="p-2 location-tab"
            tabClassName="profile-feed-tab"
          >
            {openedTab === "grades" && <LocationGrades location={location} />}
          </Tab>
          <Tab
            eventKey="events"
            title={`${t("events")} (${location.events.length})`}
            className="p-2 location-tab"
            tabClassName="profile-feed-tab"
          >
            {openedTab === "events" && <LocationEvents location={location} />}
          </Tab>
          <Tab
            eventKey="map"
            title={t("map")}
            className="p-2 location-tab"
            tabClassName="profile-feed-tab"
          >
            {openedTab === "map" && (
              <LocationMap selectedMode mapData={{ loc: [location.details] }} />
            )}
          </Tab>
        </Tabs>
      </div>
    )
  );
}

export default Location;
