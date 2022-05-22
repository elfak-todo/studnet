import "bootstrap/dist/css/bootstrap.min.css";
import "./PostHeader.style.css";
import luka from "../../../images/posts/luka.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import { Image, Card } from "react-bootstrap";

function PostHeader() {
  return (
    <div className="post-header">
      <Image
        src={luka}
        alt="user-pic"
        className="post-profile-pic"
        roundedCircle
      />
      <div>
        <Card.Text className="post-header-name"> Luka Kocić </Card.Text>
        <Card.Text className="post-header-faculty">
          Elektronski fakultet
        </Card.Text>
      </div>
      <SettingsDropdown />
    </div>
  );
}

export default PostHeader;
