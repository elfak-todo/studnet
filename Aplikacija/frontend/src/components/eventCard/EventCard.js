import "bootstrap/dist/css/bootstrap.min.css";
import "./EventCard.style.css";
import elektrijada from "../../images/events/elektrijada.jpg";
import { Card } from "react-bootstrap";

function EventCard() {
  return (
    <Card className="my-card shadow m-5 bg-white rounded">
      <Card.Img variant="top" src={elektrijada} />
      <Card.Body className="text-center">
        <Card.Title> Elektrijada </Card.Title>
        <Card.Subtitle> 24.05.2022 </Card.Subtitle>
        <Card.Subtitle className="pt-1"> Nis </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
