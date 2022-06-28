import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyReservation from "../myReservation/MyReservation";

import "./EventReserveForm.style.css";

function EventReserveForm({
  event,
  reservation,
  setReservation,
  setTicketsReserved,
  setProgress,
}) {
  const { t } = useTranslation("event");

  const ticketNumRef = useRef();
  const [numTicket, setNumTicket] = useState();
  const [edit, setEdit] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [errMessage, setErrMessage] = useState("Error");
  const [showMyReservation, setShowMyReservation] = useState();
  const [disabledInput, setDisabledInput] = useState();

  useEffect(() => {
    setNumTicket(reservation === null ? 0 : reservation.numberOfTickets);
    setShowMyReservation(reservation !== null);
    setDisabledInput(
      reservation !== null || event.numberOfTickets === event.ticketsReserved
    );
  }, [reservation, event]);

  const handleReserve = (e) => {
    e.preventDefault();

    const ticketNum = ticketNumRef.current.value;

    if (ticketNum === "" || ticketNum === 0 || ticketNum < 0) {
      setInvalid(true);
      setErrMessage(t("enterTickNum"));
      return;
    }

    if (ticketNum > 10) {
      setInvalid(true);
      setErrMessage(t("maxTicketNum"));
      return;
    }
    if (!edit) {
      axios
        .post("Reservation/", {
          eventId: event.id,
          numberOfTickets: ticketNum,
        })
        .then((res) => {
          e.target.reset();
          setReservation(res.data.reservation);
          setTicketsReserved((state) => (state += Number(ticketNum)));
          setProgress(res.data.spaceTaken);
          setDisabledInput(true);
          setShowMyReservation(true);
        })
        .catch((err) => {
          if (err.response.data === "NotEnoughTicketsLeft") {
            setInvalid(true);
            setErrMessage(t("NotEnoughTicketsLeft"));
            return;
          }
        });
    } else {
      axios
        .patch("Reservation/Edit", {
          id: reservation.id,
          eventId: event.id,
          numberOfTickets: ticketNum,
        })
        .then((res) => {
          e.target.reset();
          setReservation(res.data.reservation);
          setTicketsReserved((prev) => {
            prev -= Number(reservation.numberOfTickets);
            return (prev += Number(res.data.reservation.numberOfTickets));
          });
          setProgress(res.data.spaceTaken);
          setDisabledInput(true);
          setEdit(false);
          setNumTicket(ticketNum);
        })
        .catch((err) => {
          if (err.response.data === "NotEnoughTicketsLeft") {
            setInvalid(true);
            setErrMessage(t("NotEnoughTicketsLeft"));
            return;
          }
        });
    }
  };
  return !reservation?.canceled ? (
    <Form noValidate onSubmit={handleReserve}>
      <div className="reserve-form-div">
        <FloatingLabel label={t("ticketsNum")} className="mb-2">
          <Form.Control
            type="number"
            placeholder={"Tickets number"}
            isInvalid={invalid}
            disabled={disabledInput}
            ref={ticketNumRef}
            onChange={() => setInvalid(false)}
          />
          <Form.Control.Feedback type="invalid">
            {errMessage}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button
          variant="primary"
          type="submit"
          disabled={disabledInput}
          className="ms-3 mb-1"
        >
          {edit ? t("saveChanges") : t("reserve")}
        </Button>
      </div>
      <hr />
      {reservation && (
        <MyReservation
          event={event}
          reservation={reservation}
          setReservation={setReservation}
          showMyReservation={showMyReservation}
          setDisabledInput={setDisabledInput}
          ticketNumRef={ticketNumRef}
          setEdit={setEdit}
          numTicket={numTicket}
          setTicketsReserved={setTicketsReserved}
          setProgress={setProgress}
        />
      )}
      <Alert
        show={
          reservation === null &&
          event.numberOfTickets === event.ticketsReserved
        }
        variant="warning"
        size="sm"
      >
        <Alert.Heading> {t("warning")} </Alert.Heading> {t("allTicketsRes")}{" "}
      </Alert>
    </Form>
  ) : (
    <MyReservation
      reservation={reservation}
      setReservation={setReservation}
      showMyReservation={showMyReservation}
      setDisabledInput={setDisabledInput}
      ticketNumRef={ticketNumRef}
      setEdit={setEdit}
      numTicket={numTicket}
    />
  );
}

export default EventReserveForm;
