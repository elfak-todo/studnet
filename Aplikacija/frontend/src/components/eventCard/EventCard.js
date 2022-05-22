import "bootstrap/dist/css/bootstrap.min.css";
import "./EventCard.style.css";
import { Card } from "react-bootstrap";

function EventCard({ event }) {
  const dateTime =
    event.timeOfEvent.slice(0, 10).split("-").reverse().join(".") +
    " " +
    event.timeOfEvent.slice(11, 16) +
    " h";

  return (
    <Card className="my-card shadow m-5 bg-white rounded">
      <Card.Img variant="top" src={event.imagePath} className="card-img" />
      <Card.Body className="text-center">
        <Card.Title> {event.title} </Card.Title>
        <Card.Subtitle> {dateTime} </Card.Subtitle>
        <Card.Subtitle className="pt-1"> {event.locationName} </Card.Subtitle>
        <Card.Text> {event.description} </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
