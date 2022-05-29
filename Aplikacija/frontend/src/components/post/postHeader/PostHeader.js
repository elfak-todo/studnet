import "bootstrap/dist/css/bootstrap.min.css";
import "./PostHeader.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Image, Card } from "react-bootstrap";

function PostHeader({ author, post }) {
  const { t, i18n } = useTranslation(["post"]);

  const date = new Date(post.publicationTime);
  const timeSrp = date.toLocaleTimeString("srp", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeEng = date.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateSrp = date.toLocaleString("srp", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateEng = date.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isToday = (date) => {
    const dateToday = new Date();
    let today = false;
    if (
      date.getDate() === dateToday.getDate() &&
      date.getMonth() === dateToday.getMonth() &&
      date.getFullYear() === dateToday.getFullYear()
    ) {
      today = true;
    }
    if (today) {
      if (i18n.language === "sr") {
        return t("todayAt") + " " + timeSrp;
      } else {
        return t("todayAt") + " " + timeEng;
      }
    } else if (i18n.language === "sr") {
      return dateSrp;
    } else {
      return dateEng;
    }
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
        <Card.Text className="post-header-time"> {isToday(date)} </Card.Text>
      </div>
      {post.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {post.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      <SettingsDropdown />
    </div>
  );
}

export default PostHeader;
