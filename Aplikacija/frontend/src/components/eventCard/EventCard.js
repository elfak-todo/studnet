import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

import { parseDate } from "../../helpers/DateParser.js";
import "./EventCard.style.css";

function EventCard({ event }) {
  const { i18n } = useTranslation(["post"]);

  return (
    event && (
      <Card className="my-card shadow m-4" bg="primary" text="white">
        <Card.Img variant="top" src={event.imagePath} className="card-img" />
        <Card.Body className="text-center">
          <Card.Title className="ev-card-title"> {event.title} </Card.Title>
          <Card.Subtitle className="mt-1">
            {parseDate(event.timeOfEvent, i18n.language)}
          </Card.Subtitle>
          <Card.Subtitle className="mt-1"> {event.locationName} </Card.Subtitle>
        </Card.Body>
      </Card>
    )
  );
}

export default EventCard;
