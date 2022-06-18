import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Card, Image, ProgressBar, Button } from "react-bootstrap";

import noImage from "../../images/no-image.jpg";
import EventDetailsHeader from "./eventDetailsHeader/EventDetailsHeader";
import EventDetailsBody from "./eventDetailsBody/EventDetailsBody";
import EventDetailsOrganiser from "./eventDetailsOrganiser/EventDetailsOrganiser";
import ImagePreview from "../ImagePreview/ImagePreview";
import EventReserveForm from "./eventReserveForm/EventReserveForm";
import MyReservation from "./myReservation/MyReservation";
import StudentContext from "../studentManager/StudentManager";
import ReservationTable from "./reservationTable/ReservationTable";
import "./EventDetails.style.css";

function EventDetails({ event }) {
  const { t } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [showFullImage, setShowFullImage] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [ticketsReserved, setTicketsReserved] = useState(
    event.ev.ticketsReserved
  );

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
                  location={event.location}
                  author={event.author}
                />
                {event.ev.organisingParlamentId !== null && (
                  <ProgressBar
                    variant="primary"
                    now={event.ev.spaceTaken * 100}
                    label={`${event.ev.spaceTaken * 100} % ${t("reserved")}`}
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
        <div className="d-flex justify-content-center">
          {event.ev.organisingParlamentId !== null && event.ev.verified && (
            <EventReserveForm
              event={event.ev}
              setTicketsReserved={setTicketsReserved}
            />
          )}
          <MyReservation />
        </div>
        {event.ev.organisingParlamentId !== null &&
          event.ev.verified &&
          event.author.id === student.id && (
            <div className="d-flex justify-content-center mb-2">
              <Button
                variant="primary"
                onClick={() =>
                  showTable ? setShowTable(false) : setShowTable(true)
                }
              >
                {showTable ? t("hideResList") : t("seeResList")}
              </Button>
            </div>
          )}
        {showTable && <ReservationTable event={event.ev} />}
      </Card>
      <ImagePreview
        img={event.ev.imagePath}
        showFullImage={showFullImage}
        setShowFullImage={setShowFullImage}
      />
    </Container>
  );
}

export default EventDetails;
