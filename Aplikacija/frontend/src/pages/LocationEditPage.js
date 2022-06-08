import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddLocation from "../components/addLocation/AddLocation";

function LocationEditPage() {
  const { locationId } = useParams();
  const [initialLocation, setInitialLocation] = useState();

  useEffect(() => {
    console.log(initialLocation);
  }, [initialLocation]);

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

  return <AddLocation initialLocation={initialLocation} />;
}

export default LocationEditPage;
