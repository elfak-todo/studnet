import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button } from "react-bootstrap";

import eventTypes from "../../eventPost/EventTypes";
import StudentContext from "../../studentManager/StudentManager";
import { parseDate } from "../../../helpers/DateParser.js";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import EventFormEdit from "../../eventPost/eventFormEdit/EventFormEdit";
import "./EventDetailsHeader.style.css";

function EventDetailsHeader({
  event,
  setEvent,
  author,
  location,
  scrollRef,
  setShowReserveForm,
  setShowTable,
}) {
  const { t, i18n } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [verified, setVerified] = useState(event.verified);
  const [pinned, setPinned] = useState(event.pinned);
  const [edit, setEdit] = useState(false);

  return (
    <div className="details-text">
      <div className="ev-details-top">
        <Badge bg={eventTypes[event.type].name} className="p-2">
          {t(eventTypes[event.type].name)}
        </Badge>
        {verified && (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="post-header-verify"
          />
        )}
        {pinned && (
          <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
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
            edit={edit}
            setEdit={setEdit}
            className="ev-details-settings"
          />
        ) : null}
      </div>
      <div className="float-end end-buttons-div">
        <div>
          {event.organisingParlamentId !== null && (
            <Button
              className="mt-3"
              size="md"
              onClick={() => setShowReserveForm(true)}
            >
              {t("reserve")}
            </Button>
          )}
        </div>
        {event.organisingParlamentId !== null &&
          event.verified &&
          author.id === student.id &&
          student.role > 0 && (
            <Button
              variant="outline-primary"
              size="sm"
              className="mt-2"
              onClick={() => {
                setShowTable(true);
                window.scrollTo(0, scrollRef.current.offsetTop);
              }}
            >
              {t("seeResList")}
            </Button>
          )}
      </div>
      <h2 className="event-title"> {event.title} </h2>
      <h4 className="m-0">
        <strong className="me-2">{t("starts")}</strong>
        {parseDate(event.timeOfEvent, i18n.language)}
      </h4>
      <h4>
        <strong className="me-2">{t("ends")}</strong>
        {parseDate(event.endTime, i18n.language)}
      </h4>
      {location && <h4>
        <strong className="me-2">{t("location")}</strong>
        {location?.name}
      </h4>}
      <EventFormEdit
        event={event}
        setEvent={setEvent}
        location={location}
        edit={edit}
        setEdit={setEdit}
        feed={null}
        setFeed={null}
      />
    </div>
  );
}

export default EventDetailsHeader;
