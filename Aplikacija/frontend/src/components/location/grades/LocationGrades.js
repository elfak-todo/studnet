import React from "react";

import Feed from "../../feed/Feed";
import GradeCard from "../../gradeCard/GradeCard";

function LocationGrades({ location }) {
  return (
    <Feed url={`Location/${location.details.id}/Grades`} FeedCard={GradeCard} />
  );
}

export default LocationGrades;
