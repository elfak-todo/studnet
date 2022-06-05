import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Location.style.css";

import LocationMap from "../locationMap/LocationMap.js";

import LocationGrades from "./grades/LocationGrades.js";
import LocationDetails from "./details/LocationDetails.js";
import LocationEvents from "./events/LocationEvents.js";

function Location({ location, setLocation, author }) {
  const { t } = useTranslation(["locations"]);

  const [openedTab, setOpenedTab] = useState("details");

  return (
    location && (
      <div>
        <div
          className="text-center location-cover-image mb-3"
          style={{
            backgroundImage: `url(${location.imagePath})`,
          }}
        >
          <h1 className="text-center pt-5 pb-1 location-cover-image-text">
            {location.name}
          </h1>
          <h5 className="text-center pb-5 location-cover-image-text">
            {location.address}
          </h5>
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
            {openedTab === "details" && (
              <LocationDetails location={location} author={author} />
            )}
          </Tab>
          <Tab
            eventKey="grades"
            title={`${t("grades")} (${location.gradeCount})`}
            className="p-2 location-tab"
            tabClassName="profile-feed-tab"
          >
            <LocationGrades location={location} setLocation={setLocation} />
          </Tab>
          <Tab
            eventKey="events"
            title={`${t("events")} (${location.eventCount})`}
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
              <LocationMap selectedMode mapData={{ loc: [location] }} />
            )}
          </Tab>
        </Tabs>
      </div>
    )
  );
}

export default Location;
