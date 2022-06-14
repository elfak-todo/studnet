import { useTranslation } from "react-i18next";
import { useContext, useRef, useState } from "react";
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
  Spinner,
} from "react-bootstrap";

import "./EventForm.style.css";
import EventSelectType from "./eventSelectType/EventSelectType";
import StudentContext from "../../studentManager/StudentManager";
import AddLocation from "../../addLocation/AddLocation";
import SelectLocation from "../../selectLocation/SelectLocation";
import InfoTooltip from "../../infoTooltip/InfoTooltip";
import axios from "axios";

function EventForm({ feed, setFeed }) {
  const { t } = useTranslation(["event", "info"]);

  const { student } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);

  const [addLocationShown, setAddLocationShown] = useState(false);
  const [selectLocationShown, setSelectLocationShown] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const [typeInvalid, setTylpeInvalid] = useState(false);
  const [titleInvalid, setTitleInvalid] = useState(false);
  const [locInvalid, setLocInvalid] = useState(false);
  const [startDateInvalid, setStartDateInvalid] = useState(false);
  const [endDateInvalid, setEndDateInvalid] = useState(false);
  const [numTicketsInvalid, setNumTicketsInvalid] = useState(false);
  const [ticketPriceInvalid, setTicketPriceInvalid] = useState(false);
  const [descInvalid, setDescInvalid] = useState(false);

  const [paidEv, setPaidEv] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const titleRef = useRef();
  const ticketNumRef = useRef();
  const ticketPriceRef = useRef();
  const descRef = useRef();
  const verifiedRef = useRef();
  const pinnedRef = useRef();
  const imageRef = useRef();

  const onLocationAdded = (location) => {
    setSelectedLoc(location);
    setAddLocationShown(false);
  };

  const onLocationSelected = (location) => {
    setSelectedLoc(location);
    setSelectLocationShown(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const ticketNum = paidEv ? ticketNumRef.current.value : 0;
    const ticketPrice = paidEv ? ticketPriceRef.current.value : 0;
    const description = descRef.current.value;
    const pinned = student.role !== 0 ? pinnedRef.current.checked : false;
    const verified = student.role !== 0 ? verifiedRef.current.checked : false;

    let proceed = true;

    if (selectedType === null || selectedType === "0") {
      setTylpeInvalid(true);
      proceed = false;
    }
    if (title === "" || title.length > 128) {
      setTitleInvalid(true);
      proceed = false;
    }
    if (selectedLoc === null) {
      setLocInvalid(true);
      proceed = false;
    }
    if (startDate === null) {
      setStartDateInvalid(true);
      proceed = false;
    }
    if (endDate === null) {
      setEndDateInvalid(true);
      proceed = false;
    }
    if (paidEv && (ticketNum === "" || ticketNum > 5000)) {
      setNumTicketsInvalid(true);
      proceed = false;
    }
    if (paidEv && (ticketNum === "" || ticketPrice > 10000)) {
      setTicketPriceInvalid(true);
      proceed = false;
    }
    if (description === "" || description.length > 2048) {
      setDescInvalid(true);
      proceed = false;
    }
    if (proceed) {
      setLoading(true);

      const event = {
        pinned,
        verified,
        title,
        description,
        type: Number(selectedType - 1),
        timeOfEvent: startDate,
        endTime: endDate,
        locationId: selectedLoc.id,
        paidEvent: paidEv,
        numberOfTickets: Number(ticketNum),
        ticketPrice: Number(ticketPrice),
      };

      const formData = new FormData();
      formData.set("ev", JSON.stringify(event));
      if (imageRef.current.files.length > 0) {
        formData.set("image", imageRef.current.files[0]);
      }

      axios
        .post("Event", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFeed([res.data, ...feed]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Container className="ev-form-cont p-3 mx-auto px-0">
        <Card className="shadow-sm">
          <Card.Header>
            <Card.Title className="ev-form-title">{t("createEv")}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <EventSelectType
                    setSelectedType={setSelectedType}
                    isInvalid={typeInvalid}
                    setInvalid={setTylpeInvalid}
                  />
                  <FloatingLabel label={t("title")} className="mb-2">
                    <Form.Control
                      type="input"
                      placeholder={"Event title"}
                      isInvalid={titleInvalid}
                      ref={titleRef}
                      onChange={() => setTitleInvalid(false)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("enterTitle")} <InfoTooltip text={t("info:title")} />
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Row>
                    <Col>
                      <FloatingLabel label={t("location")} className="mb-2">
                        <Form.Control
                          className="button-in"
                          placeholder={"Location"}
                          value={selectedLoc?.name || ""}
                          isInvalid={locInvalid}
                          readOnly
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {t("enterLoc")}{" "}
                          <InfoTooltip text={t("info:location")} />
                        </Form.Control.Feedback>
                        <div
                          className={
                            !locInvalid
                              ? "location-buttons"
                              : "location-buttons-invalid"
                          }
                        >
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-3"
                            onClick={() => {
                              setSelectLocationShown(true);
                              setLocInvalid(false);
                            }}
                          >
                            {t("selectLocation")}
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setAddLocationShown(true);
                              setLocInvalid(false);
                            }}
                          >
                            {t("addLocation")}
                          </Button>
                        </div>
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FloatingLabel label={t("date")} className="mb-2">
                        <Form.Control
                          type="datetime-local"
                          isInvalid={startDateInvalid}
                          onChange={(v) => {
                            setStartDate(v.target.value);
                            setStartDateInvalid(false);
                          }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {t("enterDate")}{" "}
                          <InfoTooltip text={t("info:startDate")} />
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <FloatingLabel label={t("endDate")} className="mb-2">
                        <Form.Control
                          type="datetime-local"
                          isInvalid={endDateInvalid}
                          onChange={(v) => {
                            setEndDate(v.target.value);
                            setEndDateInvalid(false);
                          }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {t("enterEndDate")}{" "}
                          <InfoTooltip text={t("info:endDate")} />
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Form.Check
                    className="mb-2 form-switch"
                    type="switch"
                    label={t("paidEv")}
                    onChange={() => {
                      paidEv ? setPaidEv(false) : setPaidEv(true);
                    }}
                  ></Form.Check>
                  {paidEv && (
                    <Row>
                      <Col>
                        <FloatingLabel label={t("ticketsNum")} className="mb-2">
                          <Form.Control
                            type="number"
                            placeholder="Tickets number"
                            isInvalid={numTicketsInvalid}
                            ref={ticketNumRef}
                            onChange={() => setNumTicketsInvalid(false)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("enterTickNum")}{" "}
                            <InfoTooltip text={t("info:ticketNum")} />
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col>
                        <FloatingLabel
                          label={t("ticketPrice") + " (RSD)"}
                          className="mb-2"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Tickets price"
                            isInvalid={ticketPriceInvalid}
                            ref={ticketPriceRef}
                            onChange={() => setTicketPriceInvalid(false)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("etnerTickPrice")}{" "}
                            <InfoTooltip text={t("info:ticketPrice")} />
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>
                  )}
                </Col>

                <Col sm={6}>
                  <Form.Label>
                    {" "}
                    {t("addPicture")} <InfoTooltip text={t("info:pic")} />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    className="mb-2"
                    ref={imageRef}
                  ></Form.Control>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    type="input"
                    placeholder={t("description")}
                    ref={descRef}
                    isInvalid={descInvalid}
                    onChange={() => setDescInvalid(false)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("enterDesc")} <InfoTooltip text={t("info:desc")} />
                  </Form.Control.Feedback>
                  {student.role > 0 && (
                    <div className="d-flex justify-content-end">
                      <Form.Check
                        className="form-checks"
                        type="checkbox"
                        label={t("verified")}
                        ref={verifiedRef}
                        inline
                      />
                      <Form.Check
                        className="form-checks"
                        type="checkbox"
                        label={t("pinned")}
                        ref={pinnedRef}
                        inline
                      />
                    </div>
                  )}
                  <div className="d-flex justify-content-end mt-2">
                    <Button type="submit">
                      {loading && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      {t("create")}
                    </Button>
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
