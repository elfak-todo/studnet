import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Location from "../components/location/Location.js";
import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";

function LocationPage() {
  const { t } = useTranslation(["locations"]);
  const locationId = useParams().locationId;

  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    axios
      .get(`Location/${locationId}`)
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setLocation(null);
        }
      });
  }, [locationId]);

  return location !== null ? (
    <Location location={location} />
  ) : (
    <ResourceNotFound text={t("locationNotFound")} />
  );
}

export default LocationPage;
