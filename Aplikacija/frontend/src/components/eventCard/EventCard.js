import "bootstrap/dist/css/bootstrap.min.css";
import "./EventCard.style.css";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

function EventCard({ event }) {
  const { t, i18n } = useTranslation(["post"]);

  const date = new Date(event.timeOfEvent);
  const timeSrp = date.toLocaleTimeString("srp", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeEng = date.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateSrp = date.toLocaleString("srp", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateEng = date.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="my-card shadow m-5 bg-white rounded">
      <Card.Img variant="top" src={event.imagePath} className="card-img" />
      <Card.Body className="text-center">
        <Card.Title> {event.title} </Card.Title>
        <Card.Subtitle> {i18n.language === "sr" ? dateSrp : dateEng} </Card.Subtitle>
        <Card.Subtitle className="p-0 m-0"> {i18n.language === "sr" ? t("startsAt") + " " + timeSrp : t("startsAt") + " " + timeEng} </Card.Subtitle>
        <Card.Subtitle className="pt-1"> {event.locationName} </Card.Subtitle>
        <Card.Text> {event.description} </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
