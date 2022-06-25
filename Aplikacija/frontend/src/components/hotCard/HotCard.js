import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Badge, Image } from "react-bootstrap";

import { parseDate } from "../../helpers/DateParser.js";
import locationTypes from "../locationMarker/LocationTypes.js";
import eventTypes from "../eventPost/EventTypes.js";
import "./HotCard.style.css";

function HotCard({ element, navigateUrl }) {
  const { t, i18n } = useTranslation(["post", "event"]);

  const navigate = useNavigate();

  const onEventClicked = (e) => {
    navigate(navigateUrl + element.id);
  };
  return (
    element && (
      <div className="hot-card shadow-sm" onClick={onEventClicked}>
        <div
          className="hot-card-img"
          style={{ backgroundImage: `url(${element.imagePath === "" || element.imagePath === "/" ? require("../../images/no-image.jpg") : element.imagePath})` }}
        ></div>
        {navigateUrl === "/location/" ? (
          <Image
            src={locationTypes[element.type].icon.iconUrl}
            className="hot-marker-icon"
          ></Image>
        ) : (
          <div className="hot-badge">
            <Badge bg={eventTypes[element.type].name} className="p-2">
              {t(`event:${eventTypes[element.type].name}`)}
            </Badge>
          </div>
        )}
        <div className="hot-card-desc">
          <h5 className="hot-card-title mt-3">
            {element.title || element.name}
          </h5>
          {element.timeOfEvent && (
            <h6>
              {parseDate(element.timeOfEvent, i18n.language)}
              <br />
              {element.locationName}
            </h6>
          )}
        </div>
      </div>
    )
  );
}

export default HotCard;
