import "bootstrap/dist/css/bootstrap.min.css";
import "./PostHeader.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import { useTranslation } from "react-i18next";
import { Image, Card } from "react-bootstrap";

function PostHeader({ author }) {
  const { t } = useTranslation(["post"]);

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
        {/* TODO */}
        <Card.Text className="post-header-faculty">
          Elektronski fakultet
        </Card.Text>
      </div>
      <SettingsDropdown />
    </div>
  );
}

export default PostHeader;
