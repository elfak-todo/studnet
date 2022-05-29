import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card } from "react-bootstrap";

import { parseDate } from "../../../helpers/DateParser.js";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import anonymousPic from "../../../images/anonymous.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";

import "./PostHeader.style.css";

function PostHeader({ author, post, feed, setFeed }) {
  const { t, i18n } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const handleSelectedAction = (keyEvent) => {
    if (keyEvent === "delete") {
      handleDelete();
    }
  };
  const handleDelete = () => {
    axios
      .delete("Post/Delete/" + post.id)
      .then((res) => {
        setFeed(feed.filter((p) => p.post.id !== post.id));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="post-header">
      <Image
        src={
          (author !== null && author.imagePath === "/")
            ? defaultPic
            : post.anonymous ? anonymousPic : author.imagePath
        }
        alt="user-pic"
        className="post-profile-pic"
        roundedCircle
      />
      <div>
        <Card.Text className="post-header-name">
          {author === null
            ? t("anonymous")
            : author.firstName + " " + author.lastName}
        </Card.Text>
        <Card.Text className="post-header-faculty">
          {author !== null && author.facultyName}
        </Card.Text>
        <Card.Text className="post-header-time">
          {parseDate(post.publicationTime, i18n.language)}{" "}
        </Card.Text>
      </div>
      {post.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {post.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      {student !== null && author !== null && student.id === author.id && (
            <SettingsDropdown selectedAction={handleSelectedAction} />
          )}
    </div>
  );
}

export default PostHeader;
