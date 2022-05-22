import axios from "axios";
import { useEffect, useState } from "react";

import LocationMap from "../components/locationMap/LocationMap.js";

function LocationsPage() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    axios.get("Location").then((res) => {
      setMapData(res.data);
    });
  }, []);

  return <LocationMap mapData={mapData} />;
}

export default LocationsPage;
