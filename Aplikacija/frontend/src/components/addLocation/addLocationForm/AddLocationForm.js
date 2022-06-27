import React, { useContext } from "react";
import { Container, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./AddLocationForm.style.css";
import locationTypes from "../../locationMarker/LocationTypes";
import StudentContext from "../../studentManager/StudentManager";
import InfoTooltip from "../../infoTooltip/InfoTooltip";

function AddLocationForm({
  location,
  setLocation,
  state,
  imageRef,
  imageGalleryRef,
  displayTitle,
  inputStatus,
  setInputStatus,
}) {
  const { t } = useTranslation(["locations"]);

  const { student } = useContext(StudentContext);

  return (
    <Container className="add-location-form">
      {displayTitle && (
        <h4 className="mb-4 text-center">
          {state.edit ? t("locationUpdate") : t("locationCreation")}
        </h4>
      )}
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("locationName")}>
            <Form.Control
              type="input"
              placeholder="Location name"
              value={location.name || ""}
              isInvalid={inputStatus.nameInvalid}
              onChange={(e) => {
                setInputStatus((s) => {
                  return { ...s, nameInvalid: false };
                });
                setLocation((l) => {
                  return { ...l, name: e.target.value };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("nameInvalid")}
              <InfoTooltip text={t("nameInvalidTooltip")} />
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("address")}>
            <Form.Control
              type="input"
              placeholder="Address"
              value={location.address || ""}
              isInvalid={inputStatus.addressInvalid}
              onChange={(e) => {
                setInputStatus((s) => {
                  return { ...s, addressInvalid: false };
                });
                setLocation((l) => {
                  return { ...l, address: e.target.value };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("addressInvalid")}
              <InfoTooltip text={t("addressInvalidTooltip")} />
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("type")}>
            <Form.Select
              isInvalid={inputStatus.typeInvalid}
              placeholder="Type"
              value={
                location.type !== undefined && location.type !== null
                  ? location.type
                  : -1
              }
              onChange={(e) => {
                setInputStatus((s) => {
                  return { ...s, typeInvalid: false };
                });
                setLocation((l) => {
                  return { ...l, type: Number(e.target.value) };
                });
              }}
            >
              <option key={-1} value={-1}>
                {t("chooseType")}
              </option>
              {locationTypes
                .filter(
                  (l) => l.shownInAddLocations && student.role >= l.minRole
                )
                .map((o, i) => {
                  return (
                    <option key={i} value={i}>
                      {t(o.name)}
                    </option>
                  );
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {t("typeInvalid")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        {student.role > 0 ? (
          <Col>
            <Form.Check
              inline
              checked={location.verified || false}
              className="my-3"
              type="switch"
              label={t("verified")}
              onChange={(e) => {
                setLocation((l) => {
                  return { ...l, verified: e.target.checked };
                });
              }}
            ></Form.Check>
          </Col>
        ) : null}
      </Row>
      <Row className="mb-2">
        <Col>
          <FloatingLabel label={t("webpage")}>
            <Form.Control
              type="input"
              placeholder="Web page"
              value={location.webpage || ""}
              isInvalid={inputStatus.webpageInvalid}
              onChange={(e) => {
                setInputStatus((s) => {
                  return { ...s, webpageInvalid: false };
                });
                setLocation((l) => {
                  return { ...l, webpage: e.target.value };
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("webpageInvalid")}
              <InfoTooltip text={t("webpageInvalidTooltip")} />
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            as="textarea"
            placeholder={t("description")}
            value={location.description || ""}
            isInvalid={inputStatus.descriptionInvalid}
            rows={6}
            onChange={(e) => {
              setInputStatus((s) => {
                return { ...s, descriptionInvalid: false };
              });
              setLocation((l) => {
                return { ...l, description: e.target.value };
              });
            }}
          />
          <Form.Control.Feedback type="invalid">
            {t("descriptionInvalid")}
            <InfoTooltip text={t("descriptionInvalidTooltip")} />
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>{t("photo")}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            size="md"
            ref={imageRef}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>{t("photoGallery")}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            size="md"
            multiple
            ref={imageGalleryRef}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddLocationForm;
