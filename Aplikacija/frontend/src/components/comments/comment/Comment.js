import "bootstrap/dist/css/bootstrap.min.css";
import "./Comment.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Image, Card } from "react-bootstrap";

function Comment({ author, comment }) {
  const { t } = useTranslation(["post"]);

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
      <div>
        <Card.Text className="comment-name">
          {author === null
            ? t("anonymous")
            : author.firstName + " " + author.lastName}
        </Card.Text>
        {/* TODO */}
        <Card.Text className="comment-faculty">Elektronski fakultet</Card.Text>
      </div>
      {comment.verified && (
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="comment-verified-icon"
        />
      )}
      {comment.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="comment-pinned-icon" />
      )}
      <SettingsDropdown />
      <Container className="ms-0">
        <Card className="comment-body">
          <Card.Body>
            <Card.Text>{comment.text}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <div className="comment-row-icons">
        <div className="comment-center-icons">
          <FontAwesomeIcon icon={faThumbsUp} className="comment-like-icon-sm" />
          <Card.Text> {comment.likeCount} </Card.Text>
        </div>
        <div className="comment-center-icons">
          <FontAwesomeIcon icon={faThumbsUp} className="comment-like-icon" />
          <Card.Text> {t("like")} </Card.Text>
        </div>
      </div>
    </Container>
  );
}

export default Comment;
