import { useTranslation } from "react-i18next";
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";

import "./EventDetailsBody.style.css";

function EventDetailsBody() {
  const {t} = useTranslation(["event"]);

  return (
    <div>
      <Card bg="primary" text="white">
        <Card.Header>
          <h4> Description </h4>
        </Card.Header>
        <Card.Body>
          <p>
            Negujmo srbski jezik zurka, ide gas ovo ono ide picko lazljiva i ce
            bude ero ojdanic tamo. Samo ce vam uzimamo pare za ulaznicu i pivo
            ima samo nektar 500 dinaryy. Ce bude i STA CES OPET S NJOM
            LOLOLOLOLOLO
          </p>
          <hr />
          <div className="tickets-txt">
            <strong className="mb-0"> Ticket price: 500 RSD </strong>
            <strong className="mb-0"> Number of tickets left: 1000</strong>
          </div>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }} className="mt-5">
        <Card.Header className="reserve-form-title"> Make a reservation </Card.Header>
        <Card.Body>
          <Form>
            <div className="reserve-form-div">
            <FloatingLabel label={t("ticketsNum")} className="mb-2">
              <Form.Control type="number" placeholder={"Tickets number"} />
              <Form.Control.Feedback type="invalid">
                {t("enterTickNum")}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type="submit" className="ms-3"> Reserve </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EventDetailsBody;
