import "bootstrap/dist/css/bootstrap.min.css";
import "./Comment.style.css";
import luka from "../../../images/posts/luka.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Container, Image, Card } from "react-bootstrap";

function Comment() {
  const { t } = useTranslation(["post"]);

  return (
    <Container className="comment-header">
      <Image
        src={luka}
        alt="user-pic"
        className="comment-profile-pic"
        roundedCircle
      />
      <div>
        <Card.Text className="comment-name"> Luka Kocić </Card.Text>
        <Card.Text className="comment-faculty">Elektronski fakultet</Card.Text>
      </div>
      <SettingsDropdown />
      <Container className="ms-0">
        <Card className="comment-body">
          <Card.Body>
            <Card.Text>
              Divno! Divno!Divno!Divno! Divno!Divno!Divno!Divno!
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <div className="comment-row-icons">
        <div className="comment-center-icons">
          <FontAwesomeIcon icon={faThumbsUp} className="comment-like-icon-sm" />
          <Card.Text> 5 </Card.Text>
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
