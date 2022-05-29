import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card } from "react-bootstrap";

import { parseDate } from "../../../helpers/DateParser.js";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";

import "./PostHeader.style.css";

function PostHeader({ author, post }) {
  const { t, i18n } = useTranslation(["post"]);

  const handleSelectedAction = (keyEvent) => {
    //TODO
  };

  return (
    <div className="post-header">
      <Image
        src={
          (author !== null && author.imagePath === "/") ||
          author === null ||
          author.imagePath === "/"
            ? defaultPic
            : author.imagePath
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
        <Card.Text className="post-header-time"> {parseDate(post.publicationTime, i18n.language)} </Card.Text>
      </div>
      {post.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {post.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      <SettingsDropdown selectedAction={handleSelectedAction} />
    </div>
  );
}

export default PostHeader;
