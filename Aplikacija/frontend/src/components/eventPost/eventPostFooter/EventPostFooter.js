import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Card, Button } from "react-bootstrap";

import "./EventPostFooter.style.css";

function EventPostFooter({ event, isLiked, feed, setFeed }) {
  const { t } = useTranslation(["post", "event"]);

  const navigate = useNavigate();

  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    if (loading) return;

    setLoading(true);

    axios
      .put(`Event/SetLiked/${event.id}/${!liked}`)
      .then((res) => {
        setLiked(res.data);
        setFeed(
          feed.map((p) => {
            if (p.id === event.id) {
              if (res.data) {
                p.ev.likeCount = p.ev.likeCount + 1;
              } else {
                if (p.ev.likeCount > 0) p.ev.likeCount = p.ev.likeCount - 1;
              }
              return p;
            } else return p;
          })
        );

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <hr />
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
            <Card.Text> {event.commentCount} </Card.Text>
          </div>
        </div>
        <Button onClick={() => navigate(`/event/${event.id}`)}>
          {t("event:moreDetails")}
        </Button>
        <div className="align-row">
          <div className="center-items" onClick={handleLike}>
            <FontAwesomeIcon
              icon={liked ? faThumbsUp : faThumbsUpRegular}
              className="like-comment-icon"
            />
            <Card.Text className={liked ? "liked-text" : "like-text"}>
              {t("like")}
            </Card.Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPostFooter;
