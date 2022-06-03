import "./EventPost.style.css";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
import EventPostFooter from "./eventPostFooter/EventPostFooter";
import CommentSection from "../comments/commentSection/CommentSection";
import LocationCard from "../locationCard/LocationCard";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function EventPost({ author, comments, event }) {

  const {t, i18n} = useTranslation(["event"]);

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
    minute: "2-digit",
});
const timeEndEng = dateEnd.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
});
const dateEndSrp = dateEnd.toLocaleString("sr-Latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
});
const dateEndEng = dateEnd.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

  return (
    <Card className="eventpost fluid mb-4 shadow rounded">
      <EventPostHeader author={author} event={event}>
        {event.verified && (
          <FontAwesomeIcon
            className="event-header-verify"
            icon={faCircleCheck}
          />
        )}
      </EventPostHeader>
      <Card.Body className="event-card d-flex">
        <Card.Img variant="top" className="eventImage" src={event.imagePath} />
        <div className="event-text">
          <Card.Title className="event-title">{event.title}</Card.Title>
          <Card.Text>{event &&
              (event.description?.length > 339
                ? event.description?.substring(0, 340) + "..."
                : event.description)}</Card.Text>
          <Card.Text className="location">{event.locationName}</Card.Text>
          <Card.Text className="event-time">
            {" "}
            {i18n.language === "sr" ? dateSrp : dateEng}{" "}
          </Card.Text>
          <Card.Text className="event-start">
            {i18n.language === "sr" ? 
            t("startsat") + " - " + timeSrp:
            t("startsat") + " - " + timeEng
            }
          </Card.Text>
          <Card.Text className="">
            {dateEnd.getDate() !== date.getDate() ?
              i18n.language === "sr" ?
                t("lasts") + " - " + dateEndSrp + "-" + timeEndSrp:
                t("lasts") + " - " + dateEndEng + "/" + timeEndEng
               :
              i18n.language === "sr" ?
                t("lasts") + " - " + timeEndSrp:
                t("lasts") + " - " + timeEndEng
            }
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        {event && event.paidEvent ?
            <Button className="reservebtn">

            </Button>
            :
            <Button>

            </Button>
}
      </Card.Footer>
    </Card>
  );
}

export default EventPost;
