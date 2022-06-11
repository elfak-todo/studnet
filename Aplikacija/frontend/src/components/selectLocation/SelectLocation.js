import axios from "axios";
import React, { useEffect, useState } from "react";

import LocatioNMap from "../locationMap/LocationMap";

function SelectLocation({ onLocationSelected }) {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    axios.get("Location").then((res) => {
      setMapData(res.data);
    });
  }, []);

  return (
    <LocatioNMap
      mapData={mapData}
      selectMode
      onLocationSelected={onLocationSelected}
    />
  );
}

export default SelectLocation;
