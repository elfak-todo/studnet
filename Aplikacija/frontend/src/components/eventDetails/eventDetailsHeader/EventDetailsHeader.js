import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import eventTypes from "../../eventPost/EventTypes";
import { parseDate } from "../../../helpers/DateParser.js";
import "./EventDetailsHeader.style.css";

function EventDetailsHeader({ event }) {
  const { t, i18n } = useTranslation(["event"]);
  return (
    <div className="details-text">
      <div className="d-flex align-items-center">
        <h2 className="event-title"> {event.title} </h2>
        <div>
          <Badge bg={eventTypes[event.type].name} className="p-2">
            {t(eventTypes[event.type].name)}
          </Badge>
        </div>
      </div>
      <h4 className="m-0">{`${t("starts")} ${parseDate(
        event.timeOfEvent,
        i18n.language
      )}`}</h4>
      <h4>{`${t("ends")} ${parseDate(event.endTime, i18n.language)}`}</h4>
      {/* TODO */}
      <h4>{`${t("location")} Niska tvrdjava`}</h4>
    </div>
  );
}

export default EventDetailsHeader;
