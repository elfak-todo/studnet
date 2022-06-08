import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
} from "react-bootstrap";

import "./EventForm.style.css";
import EventSelectType from "./eventSelectType/EventSelectType";
import StudentContext from "../../studentManager/StudentManager";

function EventForm() {
  const { t } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [paidEv, setPaidEv] = useState(false);

  return (
    <Container className="ev-form-cont p-3 mx-auto px-0">
      <Card className="shadow">
        <Card.Header>
          <Card.Title className="ev-form-title">{t("createEv")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <EventSelectType />
                <FloatingLabel label={t("title")} className="mb-2">
                  <Form.Control type="input" placeholder={"Event title"} />
                  <Form.Control.Feedback type="invalid">
                    {t("enterTitle")}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t("location")} className="mb-2">
                  <Form.Control type="input" placeholder={"Location"} />
                  <Form.Control.Feedback type="invalid">
                    {t("enterTitle")}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Row>
                  <Col>
                    <FloatingLabel label={t("date")} className="mb-2">
                      <Form.Control type="datetime-local"></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {t("enterDate")}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel label={t("endDate")} className="mb-2">
                      <Form.Control type="datetime-local"></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {t("enterEndDate")}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Form.Check
                  className="mb-2 form-switch"
                  type="switch"
                  label={t("paidEv")}
                  onChange={() => {
                    paidEv === true ? setPaidEv(false) : setPaidEv(true);
                  }}
                ></Form.Check>
                {paidEv && (
                  <Row>
                    <Col>
                      <FloatingLabel label={t("ticketsNum")} className="mb-2">
                        <Form.Control
                          type="number"
                          placeholder={"Tickets number"}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterTickNum")}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <FloatingLabel label={t("ticketPrice")} className="mb-2">
                        <Form.Control
                          type="number"
                          placeholder={"Tickets price"}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("etnerTickPrice")}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>
                )}
              </Col>

              <Col sm={6}>
                <Form.Control
                  as="textarea"
                  rows={10}
                  type="input"
                  placeholder={t("description")}
                />
                <Form.Control.Feedback type="invalid">
                  {t("enterDesc")}
                </Form.Control.Feedback>
                {student.role > 0 && (
                  <div className="d-flex justify-content-end">
                    <Form.Check
                      className="form-checks"
                      type="checkbox"
                      label={t("verified")}
                      inline
                    />
                    <Form.Check
                      className="form-checks"
                      type="checkbox"
                      label={t("pinned")}
                      inline
                    />
                  </div>
                )}
                <div className="d-flex justify-content-end mt-2">
                  <Button type="submit">{t("create")}</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventForm;
