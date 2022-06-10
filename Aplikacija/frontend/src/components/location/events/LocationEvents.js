import React from "react";

import Feed from "../../feed/Feed";
import EventPost from "../../eventPost/EventPost";

function LocationEvents({ location }) {
  return <Feed url={`Location/${location.id}/Events`} FeedCard={EventPost} />;
}

export default LocationEvents;
