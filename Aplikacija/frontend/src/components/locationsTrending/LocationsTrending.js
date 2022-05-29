import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./LocationsTrending.style.css";
import LocationTrendingCard from "../locationTrendingCard/LocationTrendingCard.js";

function LocationsTrending() {
  const { t } = useTranslation(["locations"]);
  const [trendingLocations, setTrendingLocations] = useState(null);

  useEffect(() => {
    axios.get("Location/Trending").then((res) => {
      setTrendingLocations(res.data);
    });
  }, []);

  return (
    <div className="LocationsTrending">
      <h2 className="m-4">{t("trendingLocations")}</h2>
      {trendingLocations &&
        trendingLocations.map((l) => {
          return <LocationTrendingCard location={l} key={l.id} />;
        })}
      <div className="my-5"></div>
    </div>
  );
}

export default LocationsTrending;
