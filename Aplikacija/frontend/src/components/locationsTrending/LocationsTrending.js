import { useTranslation } from "react-i18next";

import "./LocationsTrending.style.css";
import LocationTrendingCard from "../locationTrendingCard/LocationTrendingCard.js";
import Feed from "../feed/Feed.js";

function LocationsTrending() {
  const { t } = useTranslation(["locations"]);

  return (
    <div className="locations-trending">
      <h2 className="m-4">{t("trendingLocations")}</h2>
      <Feed url="Location/Trending" FeedCard={LocationTrendingCard} />
      <div className="my-3"></div>
    </div>
  );
}

export default LocationsTrending;
