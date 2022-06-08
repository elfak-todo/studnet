import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card, OverlayTrigger, Popover } from "react-bootstrap";

import { parseDate } from "../../../helpers/DateParser.js";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import anonymousPic from "../../../images/anonymous.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";

import "./PostHeader.style.css";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard.js";

function PostHeader({ author, post, feed, setFeed, setEdit }) {
  const { t, i18n } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const [pinned, setPinned] = useState(post.pinned);
  const [verified, setVerified] = useState(post.verified);

  const handleDelete = () => {
    axios
      .delete("Post/Delete/" + post.id)
      .then(() => {
        setFeed(feed.filter((p) => p.post.id !== post.id));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handlePinn = () => {
    axios
      .put("Post/SetPinned/" + post.id + "/" + !pinned)
      .then((res) => {
        setPinned(res.data.pinned);
        setFeed((prevState) => {
          return prevState.map((p) => {
            if (p.post.id === post.id) {
              p.post.pinned = !pinned;
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
      .put("Post/SetVerified/" + post.id + "/" + !verified)
      .then((res) => {
        setVerified(res.data.verified);
        setFeed((prevState) => {
          return prevState.map((p) => {
            if (p.post.id === post.id) {
              p.post.verified = !verified;
              return p;
            } else return p;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
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
    <div className="post-header">
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
            post.anonymous
              ? anonymousPic
              : author !== null && author.imagePath === "/"
              ? defaultPic
              : author.imagePath
          }
          alt="user-pic"
          className="post-profile-pic"
          roundedCircle
        />
      </OverlayTrigger>
      <div>
        <Card.Text className="post-header-name">
          {post.anonymous
            ? t("anonymous")
            : author.firstName + " " + author.lastName}
        </Card.Text>
        <Card.Text className="post-header-faculty">
          {author !== null && !post.anonymous && author.facultyName}
        </Card.Text>
        <Card.Text className="post-header-time">
          {parseDate(post.publicationTime, i18n.language)}
        </Card.Text>
      </div>
      {post.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {post.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      {student.role === 3 ||
      (student !== null && author !== null && student.id === author.id) ? (
        <SettingsDropdown
          selectedAction={handleSelectedAction}
          verified={verified}
          pinned={pinned}
          author={author}
          className="settings-icon"
        />
      ) : null}
    </div>
  );
}

export default PostHeader;
