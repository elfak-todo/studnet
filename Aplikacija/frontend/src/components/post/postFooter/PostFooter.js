import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

import "./PostFooter.style.css";

function PostFooter({counters}) {
  const { t } = useTranslation(["post"]);
  
  return (
    <div className="post-footer">
      <div className="align-row">
        <div className="center-items">
          <FontAwesomeIcon icon={faThumbsUp} className="like-comment-icon-sm" />
          <Card.Text> {counters.likeCount} </Card.Text>
        </div>
        <div className="center-items">
          <FontAwesomeIcon icon={faComment} className="like-comment-icon-sm" />
          <Card.Text> {counters.commentCount} </Card.Text>
        </div>
      </div>
      <div className="align-row">
        <div className="center-items">
          <FontAwesomeIcon icon={faThumbsUp} className="like-comment-icon" />
          <Card.Text> {t("like")} </Card.Text>
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
