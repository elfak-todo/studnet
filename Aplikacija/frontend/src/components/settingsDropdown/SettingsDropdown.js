import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faBan,
  faTrashCan,
  faPen,
  faThumbTack,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

function SettingsDropdown({
  postType,
  commentType,
  post,
  author,
  feed,
  setFeed,
  verified,
  setVerified,
  pinned,
  setPinned,
  setEdit,
  setPostFeed,
  commentedPost,
  canceled,
  setCanceled,
  className,
}) {
  const { t } = useTranslation(["post", "event"]);

  const { student } = useContext(StudentContext);

  const [confDialog, setConfDialog] = useState({ shown: false });

  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`${postType}/Delete/${post.id}`)
      .then(() => {
        if (postType === "Comment") {
          setFeed(feed.filter((com) => com.comment.id !== post.id));

          setPostFeed((prevState) => {
            return prevState.map((p) => {
              if (p.id === commentedPost.id) {
                if (commentType === "post")
                  p.post.commentCount = p.post.commentCount - 1;
                else if (commentType === "event")
                  p.ev.commentCount = p.ev.commentCount - 1;
                return p;
              } else return p;
            });
          });
        } else {
          if (setFeed === null) {
            navigate("/events", { replace: true });
            return;
          }
          setFeed(feed.filter((p) => p.id !== post.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePinn = () => {
    axios
      .put(`${postType}/SetPinned/${post.id}/${!pinned}`)
      .then((res) => {
        setPinned(res.data.pinned);
        if (postType === "Comment") {
          setFeed((prevState) => {
            return prevState.map((p) => {
              if (p.comment.id === post.id) {
                p.comment.pinned = !pinned;
                return p;
              } else return p;
            });
          });
        } else {
          if (setFeed === null) return;
          setFeed((prevState) => {
            return prevState.map((p) => {
              if (p.id === post.id) {
                p.pinned = !pinned;
                return p;
              } else return p;
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVerify = () => {
    axios
      .put(`${postType}/SetVerified/${post.id}/${!verified}`)
      .then((res) => {
        setVerified(res.data.verified);
        if (postType === "Comment") {
          setFeed((prevState) => {
            return prevState.map((p) => {
              if (p.comment.id === post.id) {
                p.comment.verified = !verified;
                return p;
              } else return p;
            });
          });
        } else {
          if (setFeed === null) return;
          setFeed((prevState) => {
            return prevState.map((p) => {
              if (p.id === post.id) {
                p.verified = !verified;
                return p;
              } else return p;
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    if (postType !== "Event") return;
    axios
      .patch(`Event/${post.id}/Cancel`)
      .then(() => {
        if (setFeed === null) {
          navigate("/events", { replace: true });
          return;
        }
        setCanceled(!canceled);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedAction = (keyEvent) => {
    switch (keyEvent) {
      case "delete":
        setConfDialog({
          shown: true,
          callback: handleDelete,
          text:
            postType === "Post"
              ? "deletePost"
              : postType === "Event"
              ? "deleteEvent"
              : "deleteComment",
          btnText: "delete",
        });
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
      case "cancel":
        setConfDialog({
          shown: true,
          callback: handleCancel,
          text: "cancelEvent",
          btnText: "confirm",
        });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <NavDropdown
        onSelect={handleSelectedAction}
        className="ms-auto"
        title={
          <div>
            <FontAwesomeIcon icon={faEllipsisV} className={className} />
          </div>
        }
      >
        {author?.id === student.id && !canceled && (
          <NavDropdown.Item eventKey="edit">
            <FontAwesomeIcon
              icon={faPen}
              style={{ color: "#5bc0de" }}
              className="me-2"
            />
            {t("edit")}
          </NavDropdown.Item>
        )}
        {student.role !== 0 && (
          <>
            <NavDropdown.Item eventKey="verify">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#5cb85c" }}
                className="me-2"
              />
              {!verified ? t("verify") : t("unverify")}
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="pinn">
              <FontAwesomeIcon
                icon={faThumbTack}
                style={{ color: "#4e54c8" }}
                className="me-2"
              />
              {!pinned ? t("pin") : t("unpin")}
            </NavDropdown.Item>
          </>
        )}
        {postType === "Event" &&
        !canceled &&
        (author.id === student.id || student.role === 3) ? (
          <NavDropdown.Item eventKey="cancel">
            <FontAwesomeIcon
              icon={faBan}
              style={{ color: "#d9534f" }}
              className="me-2"
            />
            {t("event:cancel")}
          </NavDropdown.Item>
        ) : null}
        {author?.id === student.id || student.role > 1 ? (
          <NavDropdown.Item eventKey="delete">
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ color: "#d9534f" }}
              className="me-2"
            />
            {t("delete")}
          </NavDropdown.Item>
        ) : null}
      </NavDropdown>
      {confDialog.shown && (
        <ConfirmationDialog
          setConfDialog={setConfDialog}
          shown={confDialog.shown}
          callback={confDialog.callback}
          text={confDialog.text}
          confirmBtnText={confDialog.btnText}
        />
      )}
    </>
  );
}

export default SettingsDropdown;
