import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LocationTrendingCard.style.css";
import locationTypes from "../locationMarker/LocationTypes.js";
import LocationTrendingCardComment from "../locationTrendingCardComment/LocationTrendingCardComment.js";

function LocationTrendingCard({ feedEl, innerRef }) {
  const location = feedEl;

  const { t } = useTranslation(["locations"]);
  const navigate = useNavigate();

  return (
    <Card className="LocationTrendingCard mb-4 shadow" ref={innerRef}>
      <Card.Header className="d-flex justify-content-start">
        <Badge>{location && t(locationTypes[location?.type].name)}</Badge>
        <Badge className="ms-1">
          {location && location.averageGrade.toFixed(1)} ★
        </Badge>
        <Badge className="ms-1">{location && location.gradeCount} 💬</Badge>
        {location.verified && (
          <FontAwesomeIcon
            className="post-header-verify"
            icon={faCircleCheck}
          />
        )}
      </Card.Header>
      <Card.Body className="LocationTrendingCardBody">
        <Card.Img
          variant="top"
          className="LocationTrendingCardImage"
          src={location?.imagePath}
        />
        <div className="LocationTrendingCardText">
          <Card.Title>{location?.name}</Card.Title>
          <Card.Text>
            {location &&
              (location.description?.length > 339
                ? location.description?.substring(0, 340) + "..."
                : location.description)}
          </Card.Text>
          <Card.Title>{t("recentGrades")}:</Card.Title>
          <div className="LocationTrendingCardGrades">
            {location?.grades?.map((g) => (
              <LocationTrendingCardComment key={g.id} grade={g} />
            ))}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="">
        <Button
          className="float-end"
          variant="primary"
          onClick={(e) => navigate("/location/" + location.id)}
        >
          {t("moreDetails")}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default LocationTrendingCard;
