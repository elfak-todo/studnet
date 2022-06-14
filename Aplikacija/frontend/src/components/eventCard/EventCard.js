import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { parseDate } from "../../helpers/DateParser.js";
import "./EventCard.style.css";

function EventCard({ event }) {
  const { i18n } = useTranslation(["post"]);

  const navigate = useNavigate();

  const onEventClicked = (e) => {
    navigate(`/event/${event.id}`);
  };

  return (
    event && (
      <div className="hot-event-card shadow-sm" onClick={onEventClicked}>
        <div
          className="hot-event-card-img"
          style={{ backgroundImage: `url(${event.imagePath})` }}
        ></div>
        <div className="hot-event-card-desc">
          <h5 className="hot-event-card-title">{event.title}</h5>
          <h6>
            {parseDate(event.timeOfEvent, i18n.language)}
            <br />
            {event.locationName}
          </h6>
        </div>
      </div>
    )
  );
}

export default EventCard;
