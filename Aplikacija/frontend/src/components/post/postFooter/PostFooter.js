//import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

import "./PostFooter.style.css";
//import StudentContext from "../../studentManager/StudentManager";

function PostFooter({ post }) {
  const { t } = useTranslation(["post"]);
  //const { student } = useContext(StudentContext);

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      console.log("Unliked post: " + post.id);
    } else {
      setLiked(true);
      console.log("Liked post: " + post.id);
    }
        //TODO luka back

    // axios
    //   .put("Post/SetLiked/" + post.id + "/" + liked)
    //   .then((res) => {
    //     console.log("RESPONSE");
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   });
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
