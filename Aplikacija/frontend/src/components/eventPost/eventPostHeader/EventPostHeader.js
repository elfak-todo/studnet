import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card, OverlayTrigger, Popover } from "react-bootstrap";

import "./EventPostHeader.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";
import { parseDate } from "../../../helpers/DateParser.js";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard";
import EventFormEdit from "../eventFormEdit/EventFormEdit";

function EventPostHeader({
  author,
  event,
  location,
  feed,
  setFeed,
  verifiedProp,
  pinnedProp,
  canceled,
  setCanceled,
}) {
  const { i18n } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [pinned, setPinned] = useState(pinnedProp);
  const [verified, setVerified] = useState(verifiedProp);

  const [edit, setEdit] = useState(false);

  const [popupShown, setPopupShown] = useState(false);

  return (
    <div className="event-header">
      <OverlayTrigger
        rootClose
        show={popupShown}
        placement="right"
        overlay={
          <Popover
            onMouseEnter={(e) => setPopupShown(true)}
            onMouseLeave={(e) => setPopupShown(false)}
          >
            <ProfileHoverCard studentProp={author} />
          </Popover>
        }
      >
        <Image
          src={author.imagePath === "/" ? defaultPic : author.imagePath}
          alt="author-pic"
          className="event-profile-pic"
          roundedCircle
          onMouseEnter={(e) => setPopupShown(true)}
          onMouseLeave={(e) => setPopupShown(false)}
        />
      </OverlayTrigger>
      <div className="ms-1">
        <Card.Text className="author-name">
          {`${author.firstName} ${author.lastName}`}
        </Card.Text>
        <Card.Text className="author-fac"> {author.facultyName} </Card.Text>
        <Card.Text className="date-time-txt">
          {parseDate(event.publicationTime, i18n.language)}
        </Card.Text>
      </div>
      {verifiedProp && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {pinnedProp && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      {student.role === 3 || student.id === author.id ? (
        <SettingsDropdown
          postType="Event"
          post={event}
          author={author}
          feed={feed}
          setFeed={setFeed}
          verified={verified}
          setVerified={setVerified}
          pinned={pinned}
          setPinned={setPinned}
          setEdit={setEdit}
          canceled={canceled}
          setCanceled={setCanceled}
          className="ev-settings"
        />
      ) : null}
      <EventFormEdit
        event={event}
        location={location}
        edit={edit}
        setEdit={setEdit}
        feed={feed}
        setFeed={setFeed}
      />
    </div>
  );
}

export default EventPostHeader;
