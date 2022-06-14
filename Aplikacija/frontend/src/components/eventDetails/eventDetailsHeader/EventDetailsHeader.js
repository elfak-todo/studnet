import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";

import eventTypes from "../../eventPost/EventTypes";
import StudentContext from "../../studentManager/StudentManager";
import { parseDate } from "../../../helpers/DateParser.js";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import "./EventDetailsHeader.style.css";

function EventDetailsHeader({ event, author }) {
  const { t, i18n } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [verified, setVerified] = useState(event.verified);
  const [pinned, setPinned] = useState(event.pinned);
  const [,/*edit*/ setEdit] = useState(false);

  return (
    <div className="details-text">
      <div className="d-flex align-items-center">
        <h2 className="event-title"> {event.title} </h2>
        <div className="ev-details-top">
          <Badge bg={eventTypes[event.type].name} className="p-2 ms-2">
            {t(eventTypes[event.type].name)}
          </Badge>
          {verified && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="post-header-verify"
            />
          )}
          {pinned && (
            <FontAwesomeIcon
              icon={faThumbTack}
              className="post-header-pinned"
            />
          )}
          {student.role === 3 || student.id === author.id ? (
            <SettingsDropdown
              postType="Event"
              post={event}
              author={author}
              feed={null}
              setFeed={null}
              verified={verified}
              setVerified={setVerified}
              pinned={pinned}
              setPinned={setPinned}
              setEdit={setEdit}
              className="ev-details-settings"
            />
          ) : null}
        </div>
      </div>
      <h4 className="m-0">{`${t("starts")} ${parseDate(
        event.timeOfEvent,
        i18n.language
      )}`}</h4>
      <h4>{`${t("ends")} ${parseDate(event.endTime, i18n.language)}`}</h4>
      {/* TODO */}
      <h4>{`${t("location")} Niska tvrdjava`}</h4>
    </div>
  );
}

export default EventDetailsHeader;
