import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddLocation from "../components/addLocation/AddLocation";

import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound";
import StudentContext from "../components/studentManager/StudentManager";

function LocationEditPage() {
  const { locationId } = useParams();
  const [initialLocation, setInitialLocation] = useState();
  const {student} = useContext(StudentContext);

  useEffect(() => {
    axios
      .get(`Location/${locationId}`)
      .then((res) => {
        setInitialLocation({
          ...res.data.details,
          eventCount: res.data.eventCount,
          gradeCount: res.data.gradeCount,
        });
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setInitialLocation(null);
        }
      });
  }, [locationId]);

  return (initialLocation !== null && student.role>=2) ? (
    initialLocation !== undefined ? (
      <AddLocation initialLocation={initialLocation} />
    ) : (
      <LoadingSpinner />
    )
  ) : (
    <ResourceNotFound />
  );
}

export default LocationEditPage;
