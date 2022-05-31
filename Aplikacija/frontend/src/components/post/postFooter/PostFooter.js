import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

import "./PostFooter.style.css";

function PostFooter({ post, isLiked, feed, setFeed }) {
  const { t } = useTranslation(["post"]);

  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    if (loading) return;

    setLoading(true);

    axios
      .put("Post/SetLiked/" + post.id + "/" + !liked)
      .then((res) => {
        setLiked(res.data);
        setFeed(
          feed.map((p) => {
            if (p.post.id === post.id) {
              if (res.data) {
                p.post.likeCount = p.post.likeCount + 1;
              } else {
                if (p.post.likeCount > 0)
                  p.post.likeCount = p.post.likeCount - 1;
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
    <div className="post-footer">
      <div className="align-row">
        <div className="center-items">
          <FontAwesomeIcon icon={faThumbsUp} className="like-comment-icon-sm" />
          <Card.Text> {post.likeCount} </Card.Text>
        </div>
        <div className="center-items">
          <FontAwesomeIcon icon={faComment} className="like-comment-icon-sm" />
          <Card.Text> {post.commentCount} </Card.Text>
        </div>
      </div>
      <div className="align-row">
        <div className="center-items" onClick={handleLike}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="like-comment-icon"
            style={liked && { color: "#5bc0de" }}
          />
          <Card.Text className={liked && "liked-text"}> {t("like")} </Card.Text>
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
