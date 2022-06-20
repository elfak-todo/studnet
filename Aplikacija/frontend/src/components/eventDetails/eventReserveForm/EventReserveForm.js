import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyReservation from "../myReservation/MyReservation";

import "./EventReserveForm.style.css";

function EventReserveForm({
  event,
  reservation,
  setReservation,
  setTicketsReserved,
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
    setDisabledInput(reservation !== null);
  }, [reservation]);

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
          setReservation(res.data);
          setTicketsReserved((state) => (state += Number(ticketNum)));
          setDisabledInput(true);
          setShowMyReservation(true);
        })
        .catch((err) => {
          console.log(err);
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
          setReservation(res.data);
          setDisabledInput(true);
          setEdit(false);
          setNumTicket(ticketNum);
        })
        .catch((err) => {
          console.log(err);
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
          reservation={reservation}
          setReservation={setReservation}
          showMyReservation={showMyReservation}
          setDisabledInput={setDisabledInput}
          ticketNumRef={ticketNumRef}
          setEdit={setEdit}
          numTicket={numTicket}
        />
      )}
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
