import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge } from "react-bootstrap";

import "./EventPostBody.style.css";
import EventTypes from "../EventTypes";
import { parseDate } from "../../../helpers/DateParser.js";

function EventPostBody({ event }) {
  const { t, i18n } = useTranslation(["event"]);

  return (
    <div className="ev-body-div">
      <div className="ev-info">
      <h4> {event.title} </h4>
      <Card.Text className="mb-1"> {parseDate(event.timeOfEvent, i18n.language)}</Card.Text>
      <Card.Text className="mb-1"> {event.locationName}</Card.Text>
      </div>
      <div className="ev-badges">
        <Badge bg={EventTypes[event.type].name} className="p-2">
          {t(EventTypes[event.type].name)}
        </Badge>
        {event.paidEvent ? (
          <>
            {/* TODO */}
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
        ) : <Badge bg="success" className="ms-2 p-2">
        <FontAwesomeIcon icon={faTicket} className="me-1" />
        {t("NAF")}
      </Badge> }
      </div>
      <Card.Text className="ev-desc"> {event.description} </Card.Text>
    </div>
  );
}

export default EventPostBody;
