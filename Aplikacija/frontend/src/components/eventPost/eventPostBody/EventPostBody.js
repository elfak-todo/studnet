import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge, Button } from "react-bootstrap";

import "./EventPostBody.style.css";
import EventTypes from "../EventTypes";
import { justTime, justDate } from "../../../helpers/DateParser.js";

function EventPostBody({ event, location }) {
  const { t, i18n } = useTranslation(["event"]);

  return (
    <div className="ev-body-div">
      <div className="ev-info">
        <h4> {event.title} </h4>
        <div className="d-flex align-items-center">
          <strong>{`${t("Date")}: `}</strong>
          <p className="mb-0 ms-2">
            {justDate(event.timeOfEvent, i18n.language)}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <strong>{`${t("startsAt")}: `}</strong>
          <p className="mb-0 ms-2">
            {justTime(event.timeOfEvent, i18n.language)}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <strong>{`${t("location")}: `}</strong>
          <p className="mb-0 ms-2 p-0"> {location.name}</p>
          <Button variant="outline-primary" size="sm" className="ms-2">
            <FontAwesomeIcon icon={faMapLocationDot} /> {t("seeOnMap")}
          </Button>
        </div>
      </div>
      <div className="ev-badges">
        <Badge bg={EventTypes[event.type].name} className="p-2">
          {t(EventTypes[event.type].name)}
        </Badge>
        {event.paidEvent ? (
          <>
            <Badge className="ms-2 p-2">
              <FontAwesomeIcon icon={faTicket} className="me-1" />
              {`${t("ticketsLeft")} ${
                event.numberOfTickets - event.ticketsReserved
              }`}
            </Badge>
            <Badge className="ms-2 p-2">
              <FontAwesomeIcon icon={faTicket} className="me-1" />
              {`${t("ticketPrice")} ${event.ticketPrice} RSD`}
            </Badge>
          </>
        ) : (
          <Badge bg="success" className="ms-2 p-2">
            <FontAwesomeIcon icon={faTicket} className="me-1" />
            {t("NAF")}
          </Badge>
        )}
      </div>
      <Card.Text className="ev-desc">
        {event.description.length > 369
          ? event.description?.substring(0, 370) + "..."
          : event.description}
      </Card.Text>
    </div>
  );
}

export default EventPostBody;
