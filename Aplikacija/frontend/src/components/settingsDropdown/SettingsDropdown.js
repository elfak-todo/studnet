import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";

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
  className,
}) {
  const { t } = useTranslation(["post", "event"]);

  const { student } = useContext(StudentContext);

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
            navigate("/events");
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
    if(postType !== "Event") return;
    console.log("Cancel hehe");
  }

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
      case "cancel":
        handleCancel();
        break;
      default:
        break;
    }
  };
  return (
    <NavDropdown
      onSelect={handleSelectedAction}
      className="ms-auto"
      title={
        <div>
          <FontAwesomeIcon icon={faEllipsisV} className={className} />
        </div>
      }
    >
      {author?.id === student.id && (
        <NavDropdown.Item eventKey="edit"> {t("edit")} </NavDropdown.Item>
      )}
      {student.role !== 0 && (
        <>
          <NavDropdown.Item eventKey="verify">
            {!verified ? t("verify") : t("unverify")}
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="pinn">
            {!pinned ? t("pin") : t("unpin")}
          </NavDropdown.Item>
        </>
      )}
      {postType === "Event" && author.id === student.id && (
        <NavDropdown.Item eventKey="cancel">
          {t("event:cancel")}
        </NavDropdown.Item>
      )}
      <NavDropdown.Item eventKey="delete"> {t("delete")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingsDropdown;
