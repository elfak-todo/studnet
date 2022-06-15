import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

import "./EventDetailsBody.style.css";
import EventReserveForm from "../eventReserveForm/EventReserveForm";
import { useState } from "react";

function EventDetailsBody({ event }) {
  const { t } = useTranslation(["event"]);
  const[ticketsReserved, setTicketsReserved] = useState(event.ticketsReserved);

  return (
    <div>
      <Card bg="primary" text="white">
        <Card.Header>
          <h4> {t("description")} </h4>
        </Card.Header>
        <Card.Body>
          <p>{event.description}</p>
          <hr />
          <div className="tickets-txt">
            <strong className="mb-0">{`${t("ticketPrice")}: ${
              event.ticketPrice
            } RSD`}</strong>
            <strong className="mb-0">{`${t("ticketsLeft")}: ${
              event.numberOfTickets - ticketsReserved
            }`}</strong>
          </div>
        </Card.Body>
      </Card>
      {event.organisingParlamentId !== null && event.verified && (
        <EventReserveForm event={event} setTicketsReserved={setTicketsReserved}/>
      )}
    </div>
  );
}

export default EventDetailsBody;
