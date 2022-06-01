import "./ResourceNotFound.style.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ResourceNotFound({ text }) {
  const { t } = useTranslation(["misc"]);
  const navigate = useNavigate();

  return (
    <div className="res-not-found-container">
      <h1>
        <FontAwesomeIcon icon={faHeartBroken} beat size="2x" className="my-3" />
      </h1>
      <h2>404</h2>
      <h3>{text ?? t("resNotFound")}</h3>
      <h6 className="my-5">{t("recommendation")}</h6>
      <div className="d-flex justify-content-center">
        <Button className="mx-3" onClick={() => navigate("/home")}>
          {t("posts")}
        </Button>
        <Button className="mx-3" onClick={() => navigate("/events")}>
          {t("events")}
        </Button>
        <Button className="mx-3" onClick={() => navigate("/locations")}>
          {t("locations")}
        </Button>
      </div>
    </div>
  );
}

export default ResourceNotFound;
