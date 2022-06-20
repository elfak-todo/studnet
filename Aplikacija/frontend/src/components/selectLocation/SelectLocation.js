import axios from "axios";
import React, { useEffect, useState } from "react";

import LocationMap from "../locationMap/LocationMap";

function SelectLocation({ onLocationSelected }) {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    axios.get("Location").then((res) => {
      setMapData(res.data);
    });
  }, []);

  return (
    <LocationMap
      mapData={mapData}
      selectMode
      onLocationSelected={onLocationSelected}
    />
  );
}

export default SelectLocation;
