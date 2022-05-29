import React from "react";
import { useParams } from "react-router-dom";

function LocationPage() {
  let params = useParams();
  return <h1>Location {params.locationId}</h1>;
}

export default LocationPage;
