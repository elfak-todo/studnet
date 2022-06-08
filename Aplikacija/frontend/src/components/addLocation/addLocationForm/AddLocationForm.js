import React, { useContext, useRef, useState } from "react";
import { Container, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./AddLocationForm.style.css";
import locationTypes from "../../locationMarker/LocationTypes";
import StudentContext from "../../studentManager/StudentManager";

function AddLocationForm({ location, setLocation, state }) {
  const { t } = useTranslation(["locations"]);

  const [inputStatus, setInputStatus] = useState({});

  const nameRef = useRef();

  const { student } = useContext(StudentContext);

  return (
    <Container className="add-location-form">
      <h4 className="mb-4 text-center">
        {state.edit ? t("locationUpdate") : t("locationCreation")}
      </h4>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("locationName")}>
            <Form.Control
              type="input"
              isInvalid={inputStatus.nameInvalid}
              ref={nameRef}
              onChange={() => {
                setInputStatus((s) => {
                  return { ...s, nameInvalid: false };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {"t(enterFirstName)"}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("address")}>
            <Form.Control
              type="input"
              value={location.name}
              isInvalid={inputStatus.nameInvalid}
              ref={nameRef}
              onChange={() => {
                setInputStatus((s) => {
                  return { ...s, nameInvalid: false };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {"t(enterFirstName)"}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("type")}>
            <Form.Select
              isInvalid={false}
              value={location.type}
              onChange={(e) => {
                setLocation((l) => {
                  return { ...l, type: e.target.value };
                });

                //setInvalid(false);
              }}
            >
              <option key={-1} value={-1}>
                {t("chooseType")}
              </option>
              {locationTypes
                .filter((l) => student.role >= l.minRole)
                .map((o, i) => {
                  return (
                    <option key={i} value={i}>
                      {t(o.name)}
                    </option>
                  );
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {t("selectFac")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        {student.role > 0 ? (
          <Col>
            <Form.Check
              inline
              className="my-3"
              type="switch"
              label={t("verified")}
              ref={null}
            ></Form.Check>
          </Col>
        ) : null}
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("webpage")}>
            <Form.Control
              type="input"
              value={location.name}
              isInvalid={inputStatus.nameInvalid}
              ref={nameRef}
              onChange={() => {
                setInputStatus((s) => {
                  return { ...s, nameInvalid: false };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {"t(enterFirstName)"}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            as="textarea"
            placeholder={t("description")}
            value={location.name}
            isInvalid={inputStatus.nameInvalid}
            rows={6}
            ref={nameRef}
            onChange={() => {
              setInputStatus((s) => {
                return { ...s, nameInvalid: false };
              });
            }}
          />
          <Form.Control.Feedback type="invalid">
            {"t(enterFirstName)"}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>{t("photo")}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control type="file" accept="image/*" size="md" ref={null} />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>{t("photoGallery")}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="file"
            accept="image/*"
            size="md"
            ref={null}
            multiple
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddLocationForm;
