import "./EventPost.style.css";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
// import EventPostFooter from "./eventPostFooter/EventPostFooter";
// import CommentSection from "../comments/commentSection/CommentSection";
// import LocationCard from "../locationCard/LocationCard";
import EventTypes from "./EventTypes";
import { Card, Button, Badge } from "react-bootstrap";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCropSimple } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EventPost({ feedEl, innerRef, feed, setFeed }) {
  const author = feedEl.author;
  // const comments = feedEl.comments;
  const event = feedEl.ev;

  const { t, i18n } = useTranslation(["event"]);

  const [edit, setEdit] = useState(false);

  const [edited, setEdited] = useState(event.edited);
  const [loading, setLoading] = useState(false);

  const date = new Date(event.timeOfEvent);
  const timeSrp = date.toLocaleTimeString("sr-Latn", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeEng = date.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateSrp = date.toLocaleString("sr-Latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateEng = date.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateEnd = new Date(event.endTime);
  const timeEndSrp = dateEnd.toLocaleTimeString("sr-Latn", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const timeEndEng = dateEnd.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const dateEndSrp = dateEnd.toLocaleString("sr-Latn", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dateEndEng = dateEnd.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const editTitleInputRef = useRef();
  const editPhotoInputRef = useRef();
  const editDescriptionInputRef = useRef();

  const handleEdit = (e) => {
    if (e.keyCode === 13 && e.shiftKey===false)
      e.preventDefault();

      const editedTitle = editTitleInputRef.current.value;
      const editedPhoto = editPhotoInputRef.current.value;
      const editedDescription = editDescriptionInputRef.current.value;

      if (editedTitle === "" && editedPhoto === "" && editedDescription === "") return;

      setLoading(true);

      axios
        .put("Event/Edit", {
          id: event.id,
          title: editedTitle,
          description: editedDescription,
          imagePath: editedPhoto,
          verified: event.verified,
          pinned: event.pinned,
        })
        .then(() => {
          setLoading(false);
          setEdited(true);
          setFeed((prevState) => {
            return prevState.map((e) => {
              if (e.event.id === event.id) {
                e.event.title = editedTitle;
                e.event.imagePath = editedPhoto;
                e.event.description = editedDescription;
              } return e;
            });
          });
        }).catch((err) => {
          console.log(err.response.data);
          setLoading(false);
        });

        setEdit(false);
  };


  return (
    <Card className="eventpost mb-4 shadow-sm rounded" ref={innerRef}>
      <EventPostHeader author={author} event={event}>
        {event.verified && (
          <FontAwesomeIcon
            className="event-header-verify"
            icon={faCircleCheck}
          />
        )}
      </EventPostHeader>
      <Card.Body className="event-card">
        <Card.Img variant="top" className="eventImage" src={event.imagePath} />
        <div className="event-text">
          <Card.Title>{event.title} </Card.Title>
          <Badge bg={EventTypes[event.type].name} className="event-type">
            {event && t(EventTypes[event.type].name)}
          </Badge>
          <Card.Text>
            {event &&
              (event.description?.length > 339
                ? event.description?.substring(0, 340) + "..."
                : event.description)}
          </Card.Text>
          <Card.Text className="location">{event.locationName}</Card.Text>
          <Card.Text className="event-time">
            {" "}
            {i18n.language === "sr" ? dateSrp : dateEng}{" "}
          </Card.Text>
          <Card.Text className="event-start">
            {i18n.language === "sr"
              ? t("startsat") + " - " + timeSrp
              : t("startsat") + " - " + timeEng}
          </Card.Text>
          <Card.Text className="">
            {dateEnd.getDate() !== date.getDate()
              ? i18n.language === "sr"
                ? t("lasts") + " - " + dateEndSrp + " - " + timeEndSrp
                : t("lasts") + " - " + dateEndEng + " - " + timeEndEng
              : i18n.language === "sr"
              ? t("lasts") + " - " + timeEndSrp
              : t("lasts") + " - " + timeEndEng}
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        {event && !event.paidEvent ? (
          <Button variant="free" className="float-end" disabled>
            {t("NAF")}
          </Button>
        ) : 10 * event.ticketsReserved >= 8 * event.numberOfTickets ? (
          <Button variant="HOT" className="float-end">
            {t("reserve")}
          </Button>
        ) : event.ticketsReserved === event.numberOfTickets ? (
          <Button variant="soldout" className="float-end" disabled>
            {t("soldout")}
          </Button>
        ) : (
          <Button variant="primary" className="float-end">
            {t("reserve")}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}

export default EventPost;