import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card } from "react-bootstrap";

import "./EventPostHeader.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";
import { parseDate } from "../../../helpers/DateParser.js";

function EventPostHeader({ author, event }) {
  const { i18n } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  return (
    <div className="event-header">
      <Image
        src={author.imagePath === "/" ? defaultPic : author.imagePath}
        alt="author-pic"
        className="event-profile-pic"
        roundedCircle
      />
      <div className="ms-1">
        <Card.Text className="author-name">
          {`${author.firstName} ${author.lastName}`}
        </Card.Text>
        <Card.Text className="author-fac"> Elektronski Fakultet </Card.Text>
        <Card.Text className="date-time-txt">
          {parseDate(event.publicationTime, i18n.language)}
        </Card.Text>
      </div>
      {event.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {event.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      {student.role === 3 || student.id === author.id ? (
        <SettingsDropdown className="ev-settings" author={author} />
      ) : null}
    </div>
  );
}

export default EventPostHeader;
