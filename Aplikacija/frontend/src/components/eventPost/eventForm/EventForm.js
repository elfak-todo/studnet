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
  Modal,
  CloseButton,
} from "react-bootstrap";

import "./EventForm.style.css";
import EventSelectType from "./eventSelectType/EventSelectType";
import StudentContext from "../../studentManager/StudentManager";
import AddLocation from "../../addLocation/AddLocation";
import SelectLocation from "../../selectLocation/SelectLocation";

function EventForm() {
  const { t } = useTranslation(["event"]);

  const { student } = useContext(StudentContext);

  const [paidEv, setPaidEv] = useState(false);

  const [addLocationShown, setAddLocationShown] = useState(false);
  const [selectLocationShown, setSelectLocationShown] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const onLocationAdded = (location) => {
    console.log("Location created");
    setSelectedLoc(location);
    setAddLocationShown(false);
    //TODO šta god hoćeš radi sa selectedLoc
    //mislim da je naraso ovaj fajl sad dosta hahaha
    //ostavljam nezavršeno stilizovanje ovih dugmića :* nerasumem kolone
  };

  const onLocationSelected = (location) => {
    console.log("Location selected");
    setSelectedLoc(location);
    setSelectLocationShown(false);
  };

  return (
    <>
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
                  <Row className="align-items-center p-0">
                    <Col sm={7}>
                      <FloatingLabel label={t("location")} className="mb-2">
                        <Form.Control
                          type="text"
                          placeholder={"Location"}
                          value={selectedLoc?.name}
                          readOnly
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {t("enterTitle")}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col sm={2}>
                      <Button
                        variant="primary"
                        type="button"
                        size="md"
                        className="mb-2"
                        onClick={() => setSelectLocationShown(true)}
                      >
                        {t("selectLocation")}
                      </Button>
                    </Col>
                    <Col sm={3}>
                      <Button
                        variant="primary"
                        type="button"
                        size="md"
                        className="mb-2"
                        onClick={() => setAddLocationShown(true)}
                      >
                        {t("addLocation")}
                      </Button>
                    </Col>
                  </Row>
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
                        <FloatingLabel
                          label={t("ticketPrice")}
                          className="mb-2"
                        >
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
      <Modal
        show={selectLocationShown}
        dialogClassName="location-modal"
        onHide={() => setSelectLocationShown(false)}
      >
        <Modal.Header>
          <Modal.Title>{t("selectLocationTitle")}</Modal.Title>
          <CloseButton
            onClick={() => setSelectLocationShown(false)}
            className="me-2"
          />
        </Modal.Header>
        <Modal.Body className="location-modal-body">
          <SelectLocation onLocationSelected={onLocationSelected} />
        </Modal.Body>
      </Modal>
      <Modal
        show={addLocationShown}
        dialogClassName="location-modal"
        onHide={() => setAddLocationShown(false)}
      >
        <Modal.Header>
          <Modal.Title>{t("addLocationTitle")}</Modal.Title>
          <CloseButton
            onClick={() => setAddLocationShown(false)}
            className="me-2"
          />
        </Modal.Header>
        <Modal.Body className="location-modal-body">
          <AddLocation
            initialLocation={null}
            redirect={false}
            displayTitle={false}
            onLocationAdded={onLocationAdded}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventForm;
