import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge, Button, Modal, CloseButton } from "react-bootstrap";
import { useContext, useState } from "react";

import "./EventPostBody.style.css";
import EventTypes from "../EventTypes";
import { justTime, justDate } from "../../../helpers/DateParser.js";
import LocationMap from "../../locationMap/LocationMap";
import StudentContext from "../../studentManager/StudentManager";

function EventPostBody({ event, location, hideMapButton = false }) {
  const { t, i18n } = useTranslation(["event", "misc"]);

  const { student } = useContext(StudentContext);

  const [mapShown, setMapShown] = useState(false);

  return (
    <>
      <div className="ev-body-div">
        <div className="ev-info">
          <h4> {event.title} </h4>
          <div className="d-flex align-items-center">
            <strong>{`${t("Date")}: `}</strong>
            <p className="mb-0 ms-2">
              {justDate(event.timeOfEvent, i18n.language)}
            </p>
          </div>
          <div className="d-flex align-items-center">
            <strong>{`${t("startsAt")}: `}</strong>
            <p className="mb-0 ms-2">
              {justTime(event.timeOfEvent, i18n.language)}
            </p>
          </div>
          <div className="d-flex align-items-center">
            <strong>{`${t("location")}: `}</strong>
            <p className="mb-0 ms-2 p-0"> {location?.name}</p>
            {!hideMapButton && (
              <Button
                variant="outline-primary"
                size="sm"
                className="ms-2"
                onClick={() => setMapShown(true)}
              >
                <FontAwesomeIcon icon={faMapLocationDot} /> {t("seeOnMap")}
              </Button>
            )}
          </div>
        </div>
        <div className="ev-badges">
          <Badge bg={EventTypes[event.type].name} className="p-2">
            {t(EventTypes[event.type].name)}
          </Badge>
          {event.paidEvent ? (
            <>
              {student.role > 0 && (
                <Badge className="ms-2 p-2">
                  <FontAwesomeIcon icon={faTicket} className="me-1" />
                  {`${t("ticketsLeft")} ${
                    event.numberOfTickets - event.ticketsReserved
                  }`}
                </Badge>
              )}
              <Badge className="ms-2 p-2">
                <FontAwesomeIcon icon={faTicket} className="me-1" />
                {`${t("ticketPrice")} ${event.ticketPrice} RSD`}
              </Badge>
            </>
          ) : (
            <Badge bg="success" className="ms-2 p-2">
              <FontAwesomeIcon icon={faTicket} className="me-1" />
              {t("NAF")}
            </Badge>
          )}
        </div>
        <Card.Text className="ev-desc">
          {event.description.length > 369
            ? event.description?.substring(0, 370) + "..."
            : event.description}
        </Card.Text>
      </div>
      {!hideMapButton && (
        <Modal
          show={mapShown}
          dialogClassName="location-modal"
          onHide={() => setMapShown(false)}
        >
          <Modal.Header>
            <Modal.Title>{t("selectLocationTitle")}</Modal.Title>
            <CloseButton onClick={() => setMapShown(false)} className="me-2" />
          </Modal.Header>
          <Modal.Body className="location-modal-body">
            {location ? (
              <LocationMap mapData={{ loc: [location] }} selectedMode />
            ) : (
              <div className="text-center p-5"> {t("misc:resNotFound")} </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default EventPostBody;
