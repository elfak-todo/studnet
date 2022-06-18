import axios from "axios";
import { useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyReservation from "../myReservation/MyReservation";

import "./EventReserveForm.style.css";

function EventReserveForm({ event, setTicketsReserved }) {
  const { t } = useTranslation("event");

  const ticketNumRef = useRef();

  const [invalid, setInvalid] = useState(false);
  const [errMessage, setErrMessage] = useState("Error");

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
    axios
      .post("Reservation/", {
        eventId: event.id,
        numberOfTickets: ticketNum,
      })
      .then((res) => {
        e.target.reset();
        setTicketsReserved((state) => (state += Number(ticketNum)));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
      <Form noValidate onSubmit={handleReserve}>
        <div className="reserve-form-div">
          <FloatingLabel label={t("ticketsNum")} className="mb-2">
            <Form.Control
              type="number"
              placeholder={"Tickets number"}
              isInvalid={invalid}
              ref={ticketNumRef}
              onChange={() => setInvalid(false)}
            />
            <Form.Control.Feedback type="invalid">
              {errMessage}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="primary" type="submit" className="ms-3 mb-1">
            {t("reserve")}
          </Button>
        </div>
        <hr/>
        <MyReservation />
      </Form>
  );
}

export default EventReserveForm;
