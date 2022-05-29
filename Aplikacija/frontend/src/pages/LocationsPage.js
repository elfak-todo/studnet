import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LocationMap from "../components/locationMap/LocationMap.js";
import LocationsTrending from "../components/locationsTrending/LocationsTrending.js";

function LocationsPage() {
  const { t } = useTranslation(["locations"]);
  const navigate = useNavigate();
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    axios.get("Location").then((res) => {
      setMapData(res.data);
    });
  }, []);

  return (
    <div>
      <LocationMap mapData={mapData} />
      <Alert
        variant="primary"
        className="mx-auto my-3"
        style={{ width: "26rem", maxWidth: "96%", textAlign: "center" }}
      >
        {t("dontSeeYourLocation")}
        <Alert.Link onClick={() => navigate("/location/create")}>
          {t("here")}
        </Alert.Link>
        .
      </Alert>
      <LocationsTrending />
    </div>
  );
}

export default LocationsPage;
