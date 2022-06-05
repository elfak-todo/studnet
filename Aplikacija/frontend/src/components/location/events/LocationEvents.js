import React from "react";

import Feed from "../../feed/Feed";
import EventCard from "../../eventCard/EventCard";

function LocationEvents({ location }) {
  return <Feed url={`Location/${location.id}/Events`} FeedCard={EventCard} />;
}

export default LocationEvents;
