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
import anonymousPic from "../../../images/anonymous.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard.js";

import "./Comment.style.css";

function Comment({
  commentType,
  author,
  comment,
  comments,
  setComments,
  post,
  isLiked,
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

  const [popupShown, setPopupShown] = useState(false);

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
        });

      setEdit(false);
    }
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="comment-header">
      <OverlayTrigger
        rootClose
        placement="right"
        show={popupShown}
        overlay={
          !post.anonymous ? (
            <Popover
              onMouseEnter={(e) => setPopupShown(true)}
              onMouseLeave={(e) => setPopupShown(false)}
            >
              <ProfileHoverCard studentProp={author} />
            </Popover>
          ) : (
            <></>
          )
        }
      >
        <Image
          src={
            (author === null && comment.anonymous) ||
            (author.id === student.id && comment.anonymous)
              ? anonymousPic
              : author.imagePath === "/"
              ? defaultPic
              : author.imagePath
          }
          onMouseEnter={(e) => setPopupShown(true)}
          onMouseLeave={(e) => setPopupShown(false)}
          alt="user-pic"
          className="comment-profile-pic"
          roundedCircle
        />
      </OverlayTrigger>
      <Container className="m-0 p-0">
        <div className="text-row">
          <Card.Text className="comment-name">
            {author === null || (author?.id === student.id && comment.anonymous)
              ? t("anonymous")
              : author.firstName + " " + author.lastName}
          </Card.Text>
          <Card.Text className="comment-faculty">
            {author !== null && !comment.anonymous && author.facultyName}
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
          {student.role > 1 ||
          (student !== null && author !== null && student.id === author.id) ? (
            <SettingsDropdown
              postType="Comment"
              commentType={commentType}
              post={comment}
              author={author}
              feed={comments}
              setFeed={setComments}
              verified={verified}
              setVerified={setVerified}
              pinned={pinned}
              setPinned={setPinned}
              setEdit={setEdit}
              setPostFeed={setFeed}
              commentedPost={post}
              className="comment-settings"
            />
          ) : null}
        </div>
        <Container className="ms-0">
          <Card className="ms-0">
            <Card.Body className="py-2">
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
