import { Container, Card, Image, ProgressBar } from "react-bootstrap";

import elektrijada from "../../images/events/elektrijada.jpg";
import EventDetailsHeader from "./eventDetailsHeader/EventDetailsHeader";
import EventDetailsBody from "./eventDetailsBody/EventDetailsBody";
import EventDetailsOrganiser from "./eventDetailsOrganiser/EventDetailsOrganiser";
import "./EventDetails.style.css";

function EventDetails() {
  return (
    <Container className="mb-3 mt-3 mx-auto px-0">
      <Card className="shadow">
        <div className="main-div">
          <div className="img-ev-div">
            <Image src={elektrijada} alt="event-img" className="event-img" />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card className="card-ev">
              <Card.Header>
                <EventDetailsHeader />
                <ProgressBar
                  variant="primary"
                  now={70}
                  label="60% Reserved"
                  animated
                />
              </Card.Header>
              <Card.Body>
                <EventDetailsBody />
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Card>
      <EventDetailsOrganiser />
    </Container>
  );
}

export default EventDetails;
