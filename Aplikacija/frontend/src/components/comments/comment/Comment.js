import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Image, Card, Form } from "react-bootstrap";
import { useContext, useState, useRef } from "react";

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

  const [liked, setLiked] = useState(false);
  const [pinned, setPinned] = useState(comment.pinned);
  const [verified, setVerified] = useState(comment.verified);
  const [edit, setEdit] = useState(false);
  const [edited, setEdited] = useState(comment.edited);

  const editTextInputRef = useRef();

  const handleEdit = (e) => {
    //TODO fali EditComment metoda u back
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const editedText = editTextInputRef.current.value;

      if (editedText === "") return;

      console.log(editedText);
      
      setEdited(true);

      setEdit(false);
    }
  };

  const handleDelete = () => {
    axios
      .delete("Comment/Delete/" + comment.id)
      .then((res) => {
        setComments(comments.filter((com) => com.comment.id !== comment.id));

        setFeed((prevState) => {
          return prevState.map((p) => {
            if (p.post.id === post.id) {
              p.post.commentCount = p.post.commentCount - 1;
              return p;
            } else return p;
          });
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlePinn = () => {
    axios
      .put("Comment/SetPinned/" + comment.id + "/" + !pinned)
      .then((res) => {
        setPinned(res.data.pinned);
        setComments((prevState) => {
          return prevState.map((p) => {
            if (p.comment.id === comment.id) {
              p.comment.pinned = !pinned;
              return p;
            } else return p;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleVerify = () => {
    axios
      .put("Comment/SetVerified/" + comment.id + "/" + !verified)
      .then((res) => {
        setVerified(res.data.verified);
        setComments((prevState) => {
          return prevState.map((p) => {
            if (p.comment.id === comment.id) {
              p.comment.verified = !verified;
              return p;
            } else return p;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleLike = () => {
    //TODO
    if (liked) {
      setLiked(false);
      console.log("Unliked comment: " + comment.id);
    } else {
      setLiked(true);
      console.log("Liked comment: " + comment.id);
    }
  };

  const handleSelectedAction = (keyEvent) => {
    switch (keyEvent) {
      case "delete":
        handleDelete();
        break;
      case "verify":
        handleVerify();
        break;
      case "pinn":
        handlePinn();
        break;
      case "edit":
        setEdit(true);
        break;
      default:
        break;
    }
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
          <Card.Text className="comment-faculty">
            {author.facultyName}
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
          {student.role === 3 ||
          (student !== null && author !== null && student.id === author.id) ? (
            <SettingsDropdown
              selectedAction={handleSelectedAction}
              pinned={pinned}
              verified={verified}
            />
          ) : null}
        </div>
        <Container className="ms-0">
          <Card className="ms-0">
            <Card.Body>
              {edit ? (
                <Form noValidate>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    type="text"
                    defaultValue={comment.text}
                    onKeyDown={handleEdit}
                    ref={editTextInputRef}
                  ></Form.Control>
                </Form>
              ) : (
                <Card.Text>{comment.text}</Card.Text>
              )}
            </Card.Body>
          </Card>
          <div className="comment-row-icons">
            <div className="date-edited">
              <Card.Text className="comment-date">
                {parseDate(comment.publicationTime, i18n.language)}
              </Card.Text>
              {edited && (
                <Card.Text className="ms-2" style={{ fontSize: "x-small" }}>
                  {" "}
                  {t("edited")}{" "}
                </Card.Text>
              )}
            </div>
            <div className="comment-row-icons">
              <div className="comment-center-icons">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="comment-like-icon-sm"
                />
                <Card.Text className="me-2"> {comment.likeCount} </Card.Text>
              </div>
              <div className="comment-like" onClick={handleLike}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="comment-like-icon"
                  style={liked && { color: "#5bc0de" }}
                />
                <Card.Text className={liked && "liked-text"}>
                  {t("like")}
                </Card.Text>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
}

export default Comment;
