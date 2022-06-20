import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LocationTrendingCard.style.css";
import locationTypes from "../locationMarker/LocationTypes.js";
import LocationTrendingCardComment from "../locationTrendingCardComment/LocationTrendingCardComment.js";
import defaultLocationImage from "../../images/defaultLocation.jpg";

function LocationTrendingCard({ feedEl, innerRef }) {
  const location = feedEl;

  const { t } = useTranslation(["locations"]);
  const navigate = useNavigate();

  return (
    <Card className="LocationTrendingCard my-2 shadow-sm" ref={innerRef}>
      <Card.Header className="d-flex justify-content-start">
        <Badge>{location && t(locationTypes[location?.type].name)}</Badge>
        {location && (
          <Badge className="ms-1">
            {location.averageGrade !== -1
              ? location.averageGrade.toFixed(1) + " ★"
              : t("locations:noGradesShort")}
          </Badge>
        )}
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
          src={
            location?.imagePath && location.imagePath !== "/"
              ? location?.imagePath
              : defaultLocationImage
          }
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
            {location?.grades?.length > 0 ? (
              location?.grades?.map((g) => (
                <LocationTrendingCardComment key={g.id} grade={g} />
              ))
            ) : (
              <p className="no-location-grades">{t("noGrades")}</p>
            )}
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
