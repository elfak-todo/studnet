import React from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import testImg from "../../images/locations/elfak.jpg";

import "./LocationCard.style.css";

function LocationCard({ openedLocation, setOpenedLocation }) {
  const { t } = useTranslation(["locations"]);

  return (
    openedLocation && (
      <Card
        style={{ width: "18rem" }}
        className="location-card shadow m-5 bg-white rounded"
      >
        <Card.Header>
          <CloseButton
            className="ms-auto"
            onClick={(e) => {
              setOpenedLocation(null);
            }}
          />
        </Card.Header>

        <Card.Img variant="top" src={testImg} />
        <Card.Body>
          <Card.Title>{openedLocation.name}</Card.Title>
          <Card.Text>{openedLocation.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="">
          <Button className="ms-auto" variant="primary">
            {t("moreDetails")}
          </Button>
        </Card.Footer>
      </Card>
    )
  );
}

export default LocationCard;
