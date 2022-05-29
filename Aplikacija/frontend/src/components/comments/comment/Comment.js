import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Image, Card } from "react-bootstrap";
import { useContext } from "react";

import { parseDate } from "../../../helpers/DateParser.js";
import StudentContext from "../../studentManager/StudentManager";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";

import "./Comment.style.css";


function Comment({
  author,
  comment,
  comments,
  setComments,
  post,
  feed,
  setFeed,
}) {
  const { t, i18n } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const handleSelectedAction = (keyEvent) => {
    if (keyEvent === "delete") handleDelete();
  };

  const handleDelete = () => {
    axios
      .delete("Comment/Delete/" + comment.id)
      .then((res) => {
        setComments(comments.filter((com) => com.comment.id !== comment.id));
        commentCounterDec();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const commentCounterDec = () => {
    let feedCopy = [];

    feed.forEach((p) => {
      if (p.post.id === post.id) {
        let postCopy = p;
        postCopy.post.commentCount = postCopy.post.commentCount - 1;
        feedCopy.push(postCopy);
      } else feedCopy.push(p);
    });

    setFeed(feedCopy);
  };

  return (
    <Container className="comment-header">
      <Image
        src={
          (author !== null && author.imagePath === "/") ||
          author === null ||
          author.imagePath === "/"
            ? defaultPic
            : author.imagePath
        }
        alt="user-pic"
        className="comment-profile-pic"
        roundedCircle
      />
      <Container className="m-0 p-0">
        <div className="text-row">
          <Card.Text className="comment-name">
            {author === null
              ? t("anonymous")
              : author.firstName + " " + author.lastName}
          </Card.Text>
          {/* TODO */}
          <Card.Text className="comment-faculty">
            Elektronski fakultet
          </Card.Text>
          <div>
            {comment.verified && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="comment-verified-icon"
              />
            )}
            {comment.pinned && (
              <FontAwesomeIcon
                icon={faThumbTack}
                className="comment-pinned-icon"
              />
            )}
          </div>
          {student.id === author.id && (
            <SettingsDropdown selectedAction={handleSelectedAction} />
          )}
        </div>
        <Container className="ms-0">
          <Card className="ms-0">
            <Card.Body>
              <Card.Text>{comment.text}</Card.Text>
            </Card.Body>
          </Card>
          <div className="comment-row-icons">
          <Card.Text className="comment-date"> {parseDate(comment.publicationTime, i18n.language)} </Card.Text>
          <div className="comment-row-icons">
            <div className="comment-center-icons">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="comment-like-icon-sm"
              />
              <Card.Text className="me-2"> {comment.likeCount} </Card.Text>
            </div>
            <div className="comment-center-icons">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="comment-like-icon"
              />
              <Card.Text> {t("like")} </Card.Text>
            </div>
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
}

export default Comment;
