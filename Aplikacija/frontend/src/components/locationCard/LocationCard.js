import React from "react";
import { Card, Button, CloseButton, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import locationTypes from "../location/LocationTypes.js";

import "./LocationCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LocationCard({ openedLocation, setOpenedLocation }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["locations"]);

  return (
    <Card
      className={
        "location-card shadow m-3 bg-white rounded" +
        (openedLocation && " visible")
      }
    >
      <Card.Header>
        <div className="d-inline-flex justify-content-start">
          <Badge>
            {openedLocation && t(locationTypes[openedLocation?.type].name)}
          </Badge>
          <Badge className="ms-1">
            {openedLocation && openedLocation.averageGrade.toFixed(1)} ★
          </Badge>
          {openedLocation?.verified && (
            <FontAwesomeIcon
              className="post-header-verify"
              icon={faCircleCheck}
            />
          )}
        </div>
        <CloseButton
          className="float-end"
          onClick={(e) => {
            setOpenedLocation(null);
          }}
        />
      </Card.Header>
      <Card.Img variant="top" src={openedLocation?.imagePath} />
      <Card.Body>
        <Card.Title>{openedLocation?.name}</Card.Title>
        <Card.Text>
          {openedLocation &&
            (openedLocation.description?.length > 199
              ? openedLocation.description?.substring(0, 200) + "..."
              : openedLocation.description)}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="">
        <Button
          className="float-end"
          variant="primary"
          onClick={(e) => navigate("/location/" + openedLocation.id)}
        >
          {t("moreDetails")}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default LocationCard;
