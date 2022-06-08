import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Card, Button } from "react-bootstrap";

import "./EventPostFooter.style.css";

function EventPostFooter({ event }) {
  const { t } = useTranslation(["post", "event"]);

  const navigate = useNavigate();

  return (
    <div className="event-post-footer">
      <div className="align-row">
        <div className="center-items">
          <FontAwesomeIcon
            icon={faThumbsUpRegular}
            className="like-comment-icon-sm"
          />
          <Card.Text> {event.likeCount} </Card.Text>
        </div>
        <div className="center-items">
          <FontAwesomeIcon
            icon={faCommentRegular}
            className="like-comment-icon-sm"
          />
          {/* TODO */}
          <Card.Text> 0 </Card.Text>
        </div>
      </div>
        <Button onClick={() => navigate(`/event`)}>
          {t("event:moreDetails")}
        </Button>
      <div className="align-row">
        <div className="center-items">
          <FontAwesomeIcon
            icon={faThumbsUpRegular}
            className="like-comment-icon"
          />
          <Card.Text> {t("like")} </Card.Text>
        </div>
      </div>
    </div>
  );
}

export default EventPostFooter;
