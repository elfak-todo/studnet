import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

import "./AddUniversityBody.style.css";
import AddLocationMap from "../../../addLocation/addLocationMap/AddLocationMap";
import StudentContext from "../../../studentManager/StudentManager";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoTooltip from "../../../infoTooltip/InfoTooltip";

function AddUniversityBody({
  initialUniversity,
  setUniversities,
  setShowAddUni,
}) {
  const { t } = useTranslation(["admin"]);

  const { student } = useContext(StudentContext);

  const [state, setState] = useState({ edit: false });
  const [inputStatus, setInputStatus] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [university, setUniversity] = useState(null);

  useEffect(() => {
    if (initialUniversity) {
      setUniversity({
        city: initialUniversity.city,
        id: initialUniversity.id,
        name: initialUniversity.name,
        location: {
          latitude: initialUniversity.latitude,
          longitude: initialUniversity.longitude,
          type: 16,
          verified: true,
        },
      });
      setState({ edit: true });
    } else {
      setUniversity({
        location: {
          latitude: student.universityLatitude,
          longitude: student.universityLongitude,
          type: 16,
          verified: true,
        },
      });
    }
  }, [initialUniversity, student]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (state.loading) {
      return;
    }

    let proceed = true;

    if (
      !university.name ||
      !university.name === "" ||
      university.name.length > 128
    ) {
      setInputStatus((s) => {
        return { ...s, universityNameInvalid: true };
      });
      proceed = false;
    }

    if (
      !university.city ||
      !university.city === "" ||
      university.city.length > 128
    ) {
      setInputStatus((s) => {
        return { ...s, universityCityInvalid: true };
      });
      proceed = false;
    }

    if (proceed) {
      setState((s) => {
        return { ...s, loading: true };
      });

      if (state.edit) {
        axios
          .patch(`University/${university.id}`, {
            name: university.name,
            city: university.city,
            longitude: university.location.longitude,
            latitude: university.location.latitude,
          })
          .then((res) => {
            setUniversities((p) => {
              const newList = [...p];
              const i = newList.findIndex((e) => e.id === res.data.id);
              newList[i] = res.data;
              return newList;
            });
            setShowSuccessModal(true);
          });
      } else {
        axios
          .post("University", {
            name: university.name,
            city: university.city,
            longitude: university.location.longitude,
            latitude: university.location.latitude,
          })
          .then((res) => {
            setUniversities((p) => {
              return [...p, res.data];
            });
            setShowSuccessModal(true);
          });
      }
    }
  };

  const resetHandler = (e) => {
    setUniversity(initialUniversity);
  };

  const setLocation = (func) => {
    setUniversity((p) => {
      return { ...p, location: func(p.location) };
    });
  };

  return (
    university && (
      <>
        <Form noValidate onSubmit={submitHandler}>
          <div className="add-university-body">
            <div className="add-university-form">
              <Row className="add-parlament-name">
                <Col sm={3} className="p-0">
                  <FloatingLabel label={t("universityName")}>
                    <Form.Control
                      type="input"
                      placeholder="University name"
                      value={university.name || ""}
                      isInvalid={inputStatus.universityNameInvalid}
                      onChange={(e) => {
                        setInputStatus((s) => {
                          return { ...s, universityNameInvalid: false };
                        });
                        setUniversity((p) => {
                          return { ...p, name: e.target.value };
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("universityNameInvalid")}
                      <InfoTooltip text={t("universityNameInvalidTooltip")} />
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col sm={3}>
                  <FloatingLabel label={t("universityCity")}>
                    <Form.Control
                      type="input"
                      placeholder="University city"
                      value={university.city || ""}
                      isInvalid={inputStatus.universityCityInvalid}
                      onChange={(e) => {
                        setInputStatus((s) => {
                          return { ...s, universityCityInvalid: false };
                        });
                        setUniversity((p) => {
                          return { ...p, city: e.target.value };
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("universityCityInvalid")}
                      <InfoTooltip text={t("universityCityInvalidTooltip")} />
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <AddLocationMap
              location={university.location}
              setLocation={setLocation}
              state={state}
              wideMode
              smallHeight
            />
          </div>
          <div className="d-flex justify-content-center mt-3 mb-3">
            {state.edit && (
              <Button
                variant="primary"
                type="button"
                size="md"
                className="me-2"
                onClick={resetHandler}
              >
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </Button>
            )}
            <Button variant="primary" type="submit" size="md">
              {state.loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {state.edit ? t("editUniversity") : t("addUniversity")}
            </Button>
          </div>
        </Form>
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("success")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {state.edit
                ? t("uniEditedSuccessfuly")
                : t("uniAddedSuccessfuly")}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                setShowAddUni(false);
              }}
            >
              {t("ok")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
}

export default AddUniversityBody;
