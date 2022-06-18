import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

import "./EventDetailsBody.style.css";

function EventDetailsBody({ event, ticketsReserved }) {
  const { t } = useTranslation(["event"]);

  return (
    <Card bg="primary-light" className="ev-body-card">
      <Card.Header>
        <h4> {t("description")} </h4>
      </Card.Header>
      <Card.Body>
        <div className="bottom-txt-desc">
          <div>
            <p>{event.description}</p>
          </div>
          <div className="tickets-txt-div">
            <hr />
            <div className="tickets-txt">
              <div className="d-flex">
                <strong className="mb-0">{`${t("ticketPrice")}:`}</strong>
                <span className="ms-2">{`${event.ticketPrice} RSD`}</span>
              </div>
              <div className="d-flex">
                <strong className="mb-0">{`${t("ticketsLeft")}: `}</strong>
                <p className="mb-0 ms-2">
                  {event.numberOfTickets - ticketsReserved}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventDetailsBody;
