import { useTranslation } from "react-i18next";
import { Container, Card, Image, ProgressBar } from "react-bootstrap";

import noImage from "../../images/no-image.jpg";
import EventDetailsHeader from "./eventDetailsHeader/EventDetailsHeader";
import EventDetailsBody from "./eventDetailsBody/EventDetailsBody";
import EventDetailsOrganiser from "./eventDetailsOrganiser/EventDetailsOrganiser";
import "./EventDetails.style.css";

function EventDetails({ event }) {
  const { t } = useTranslation(["event"]);
  return (
    <Container className="mb-3 mt-3 mx-auto px-0">
      <Card className="shadow">
        <div className="main-div">
          <div className="img-ev-div">
            <Image
              src={event.ev.imagePath === "" ? noImage : event.ev.imagePath}
              alt="event-img"
              className="event-img"
            />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card className="card-ev">
              <Card.Header>
                <EventDetailsHeader event={event.ev} author={event.author} />
                {event.ev.organisingParlamentId !== null && (
                  <ProgressBar
                    variant="primary"
                    now={event.ev.spaceTaken * 100}
                    label={`${event.ev.spaceTaken * 100} % ${t("reserved")}`}
                    animated
                  />
                )}
              </Card.Header>
              <Card.Body>
                <EventDetailsBody event={event.ev} />
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Card>
      <EventDetailsOrganiser event={event.ev} author={event.author} />
    </Container>
  );
}

export default EventDetails;
