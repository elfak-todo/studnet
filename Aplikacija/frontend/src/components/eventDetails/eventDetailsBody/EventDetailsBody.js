import { useTranslation } from "react-i18next";
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";

import "./EventDetailsBody.style.css";

function EventDetailsBody({ event }) {
  const { t } = useTranslation(["event"]);

  return (
    <div>
      <Card bg="primary" text="white">
        <Card.Header>
          <h4> {t("description")} </h4>
        </Card.Header>
        <Card.Body>
          <p>{event.description}</p>
          <hr />
          <div className="tickets-txt">
            <strong className="mb-0">{`${t("ticketPrice")}: ${
              event.ticketPrice
            } RSD`}</strong>
            <strong className="mb-0">{`${t("ticketsLeft")}: ${
              event.numberOfTickets - event.ticketsReserved
            }`}</strong>
          </div>
        </Card.Body>
      </Card>
      {event.organisingParlamentId !== null && (
        <Card style={{ width: "20rem" }} className="mt-5">
          <Card.Header className="reserve-form-title">
            {t("makeRes")}
          </Card.Header>
          <Card.Body>
            <Form>
              <div className="reserve-form-div">
                <FloatingLabel label={t("ticketsNum")} className="mb-2">
                  <Form.Control type="number" placeholder={"Tickets number"} />
                  <Form.Control.Feedback type="invalid">
                    {t("enterTickNum")}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="primary" type="submit" className="ms-3">
                  {t("reserve")}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default EventDetailsBody;
