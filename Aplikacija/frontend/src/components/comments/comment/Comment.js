import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp,
  faCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Image,
  Card,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import { parseDate } from "../../../helpers/DateParser.js";
import StudentContext from "../../studentManager/StudentManager";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard.js";

import "./Comment.style.css";

function Comment({
  author,
  comment,
  comments,
  setComments,
  post,
  isLiked,
  feed,
  setFeed,
}) {
  const { t, i18n } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(isLiked);
  const [pinned, setPinned] = useState(comment.pinned);
  const [verified, setVerified] = useState(comment.verified);
  const [edit, setEdit] = useState(false);
  const [edited, setEdited] = useState(comment.edited);

  const editTextInputRef = useRef();

  const handleEdit = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const editedText = editTextInputRef.current.value;

      if (editedText === "") return;

      axios
        .put("Comment/Edit", {
          id: comment.id,
          text: editedText,
          verified: comment.verified,
          pinned: comment.pinned,
        })
        .then(() => {
          setEdited(true);
          setComments((prevState) => {
            return prevState.map((c) => {
              if (c.comment.id === comment.id) {
                c.comment.text = editedText;
                return c;
              } else return c;
            });
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
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
    if (loading) return;

    setLoading(true);
    axios
      .put("Comment/SetLiked/" + comment.id + "/" + !liked)
      .then((res) => {
        setLiked(res.data);
        setComments(
          comments.map((c) => {
            if (c.comment.id === comment.id) {
              if (res.data) {
                c.comment.likeCount = c.comment.likeCount + 1;
              } else {
                if (c.comment.likeCount > 0)
                  c.comment.likeCount = c.comment.likeCount - 1;
              }
              return c;
            } else return c;
          })
        );

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
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
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="right"
        overlay={
          !post.anonymous ? (
            <Popover>
              <ProfileHoverCard studentProp={author} />
            </Popover>
          ) : (
            <></>
          )
        }
      >
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
      </OverlayTrigger>
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
              author={author}
              className="comment-settings"
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
                  {t("edited")}
                </Card.Text>
              )}
            </div>
            <div className="comment-row-icons">
              <div className="comment-center-icons">
                <FontAwesomeIcon
                  icon={faThumbsUpRegular}
                  className="comment-like-icon-sm"
                />
                <Card.Text className="me-2"> {comment.likeCount} </Card.Text>
              </div>
              <div className="comment-like" onClick={handleLike}>
                <FontAwesomeIcon
                  icon={liked ? faThumbsUp : faThumbsUpRegular}
                  className="comment-like-icon"
                />
                <Card.Text className={liked ? "liked-text" : "like-text"}>
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
