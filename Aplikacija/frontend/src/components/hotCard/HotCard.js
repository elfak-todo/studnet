import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { parseDate } from "../../helpers/DateParser.js";
import "./HotCard.style.css";

function HotCard({ element, navigateUrl }) {
  const { i18n } = useTranslation(["post"]);

  const navigate = useNavigate();

  const onEventClicked = (e) => {
    navigate(navigateUrl + element.id);
  };

  return (
    element && (
      <div className="hot-card shadow-sm" onClick={onEventClicked}>
        <div
          className="hot-card-img"
          style={{ backgroundImage: `url(${element.imagePath})` }}
        ></div>
        <div className="hot-card-desc">
          <h5 className="hot-card-title">{element.title || element.name}</h5>
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
