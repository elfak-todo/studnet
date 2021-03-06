import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Card,
  Image,
  ProgressBar,
  Button,
  Modal,
  CloseButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import noImage from "../../images/no-image.jpg";
import EventDetailsHeader from "./eventDetailsHeader/EventDetailsHeader";
import EventDetailsBody from "./eventDetailsBody/EventDetailsBody";
import EventDetailsOrganiser from "./eventDetailsOrganiser/EventDetailsOrganiser";
import ImagePreview from "../ImagePreview/ImagePreview";
import EventReserveForm from "./eventReserveForm/EventReserveForm";
import StudentContext from "../studentManager/StudentManager";
import ReservationTable from "./reservationTable/ReservationTable";
import LocationMap from "../locationMap/LocationMap";
import "./EventDetails.style.css";

function EventDetails({ event, setEvent }) {
  const { t } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [showReserveForm, setShowReserveForm] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [ticketsReserved, setTicketsReserved] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reservation, setReservation] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    setTicketsReserved(event.ev.ticketsReserved);
    setReservation(event.reservation);
    setProgress(event.ev.spaceTaken);
  }, [event]);

  return (
    <Container className="mb-3 mt-3 mx-auto px-0">
      <div className="d-flex justify-content-center">
        <EventDetailsOrganiser event={event.ev} author={event.author} />
      </div>
      <Card className="shadow">
        <div className="main-div">
          <div className="img-ev-div">
            <Image
              src={event.ev.imagePath === "" ? noImage : event.ev.imagePath}
              alt="event-img"
              className="event-img"
              onClick={() =>
                event.ev.imagePath !== "" && setShowFullImage(true)
              }
            />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card className="card-ev">
              <Card.Header>
                <EventDetailsHeader
                  event={event.ev}
                  setEvent={setEvent}
                  location={event.location}
                  author={event.author}
                  scrollRef={scrollRef}
                  setShowReserveForm={setShowReserveForm}
                  setShowTable={setShowTable}
                />
                {event.ev.organisingParlamentId !== null && (
                  <ProgressBar
                    variant="primary"
                    now={progress * 100}
                    label={`${Math.round(Number(progress * 100)).toFixed(
                      0
                    )} % ${t("reserved")}`}
                    animated
                  />
                )}
                {!event.ev.paidEvent && (
                  <ProgressBar
                    variant="success"
                    now={100}
                    label={`100 % ${t("NAF")}`}
                    animated
                  />
                )}
              </Card.Header>
              <Card.Body>
                <EventDetailsBody
                  event={event.ev}
                  ticketsReserved={ticketsReserved}
                />
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div className="p-2">
          {event.location && (
            <LocationMap mapData={{ loc: [event.location] }} selectedMode />
          )}
        </div>
        <div className="d-flex justify-content-center"></div>
        {event.ev.organisingParlamentId !== null &&
          event.ev.verified &&
          event.author.id === student.id && (
            <div className="d-flex justify-content-center mb-2">
              <Button
                variant="primary"
                ref={scrollRef}
                onClick={() =>
                  showTable ? setShowTable(false) : setShowTable(true)
                }
              >
                {showTable ? t("hideResList") : t("seeResList")}
                <FontAwesomeIcon
                  icon={showTable ? faAngleUp : faAngleDown}
                  className="ms-2"
                />
              </Button>
            </div>
          )}
        {showTable && (
          <ReservationTable
            event={event.ev}
            reservation={reservation}
            setReservation={setReservation}
            scrollRef={scrollRef}
          />
        )}
      </Card>
      <ImagePreview
        img={event.ev.imagePath}
        showFullImage={showFullImage}
        setShowFullImage={setShowFullImage}
      />
      <Modal
        show={showReserveForm}
        onHide={() => setShowReserveForm(false)}
        centered
      >
        <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
          <Modal.Title style={{ color: "white" }}>{t("makeRes")}</Modal.Title>
          <CloseButton
            variant="white"
            onClick={() => setShowReserveForm(false)}
          />
        </Modal.Header>
        <Modal.Body>
          {event.ev.organisingParlamentId !== null && event.ev.verified && (
            <EventReserveForm
              event={event.ev}
              reservation={reservation}
              setReservation={setReservation}
              setTicketsReserved={setTicketsReserved}
              setProgress={setProgress}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default EventDetails;
