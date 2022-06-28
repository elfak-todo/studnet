import React, { useContext, useEffect, useRef, useState } from "react";
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

import "./AddParlamentBody.style.css";
import AddLocationForm from "../../../addLocation/addLocationForm/AddLocationForm";
import AddLocationMap from "../../../addLocation/addLocationMap/AddLocationMap";
import StudentContext from "../../../studentManager/StudentManager";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoTooltip from "../../../infoTooltip/InfoTooltip";
import SelectUniversity from "../../../selectUniveristy/SelectUniveristy";

function AddParlamentBody({
  initialParlament,
  redirect = true,
  displayTitle = true,
  onParlamentAdded,
  setParlaments,
  setShowAddParlament,
}) {
  const { t } = useTranslation(["admin"]);

  const { student } = useContext(StudentContext);

  const [state, setState] = useState({ edit: false });
  const [inputStatus, setInputStatus] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedUni, setSelectedUni] = useState("0");
  const [parlament, setParlament] = useState(null);

  const imageRef = useRef();
  const imageGalleryRef = useRef();

  const webpageRegularExpression =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

  useEffect(() => {
    if (initialParlament) {
      setParlament(initialParlament);
      setState({ edit: true });
    } else {
      setParlament({
        location: {
          latitude: student.universityLatitude,
          longitude: student.universityLongitude,
          type: 8,
          verified: true,
        },
      });
    }
  }, [initialParlament, student]);

  const setSelectedUniInvalid = (invalid) => {
    setInputStatus((s) => {
      return { ...s, selectedUniInvalid: invalid };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (state.loading) {
      return;
    }

    console.log("skfdoafkdofko");

    let proceed = true;

    if (
      !parlament.name ||
      !parlament.name === "" ||
      parlament.name.length > 128
    ) {
      setInputStatus((s) => {
        return { ...s, parlamentNameInvalid: true };
      });
      proceed = false;
    }

    if (
      !parlament.location.name ||
      parlament.location.name === "" ||
      parlament.location.name.length > 128
    ) {
      setInputStatus((s) => {
        return { ...s, nameInvalid: true };
      });
      proceed = false;
    }
    if (
      !parlament.location.address ||
      parlament.location.address === "" ||
      parlament.location.address.length > 256
    ) {
      setInputStatus((s) => {
        return { ...s, addressInvalid: true };
      });
      proceed = false;
    }
    if (
      parlament.location.webpage &&
      parlament.location.wepage !== "" &&
      (parlament.location.webpage.length > 256 ||
        !parlament.location.webpage.match(webpageRegularExpression))
    ) {
      setInputStatus((s) => {
        return { ...s, webpageInvalid: true };
      });
      proceed = false;
    }
    if (
      !parlament.location.description ||
      parlament.location.description === "" ||
      parlament.location.description.length > 2048
    ) {
      setInputStatus((s) => {
        return { ...s, descriptionInvalid: true };
      });
      proceed = false;
    }

    if (!state.edit && selectedUni === "0") {
      setInputStatus((s) => {
        return { ...s, selectedUniInvalid: true };
      });
      proceed = false;
    }

    parlament.uniId = Number(selectedUni);

    if (proceed) {
      console.log("DJFIDJIJFDI");

      setState((s) => {
        return { ...s, loading: true };
      });

      const formData = new FormData();
      formData.set("parlament", JSON.stringify(parlament));

      if (imageRef.current.files.length > 0) {
        formData.set("image", imageRef.current.files[0]);
      }

      const files = imageGalleryRef.current.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("imageGallery", files[i]);
      }

      if (state.edit) {
        axios
          .patch(`Parlament/${parlament.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setParlaments((p) => {
              const newList = [...p];
              const i = newList.findIndex((e) => e.id === res.data.id);
              newList[i] = res.data;
              return newList;
            });
            setState((s) => {
              return { ...s, loading: false };
            });
            setShowSuccessModal(true);
          });
      } else {
        axios
          .post("Parlament", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setParlaments((p) => {
              return [...p, res.data];
            });
            setState((s) => {
              return { ...s, loading: false };
            });
            setShowSuccessModal(true);
          });
      }
    }
  };

  const resetHandler = (e) => {
    setParlament(initialParlament);
  };

  const setLocation = (func) => {
    setParlament((p) => {
      return { ...p, location: func(p.location) };
    });
  };

  return (
    parlament && (
      <>
        <Form noValidate onSubmit={submitHandler}>
          <div className="add-location-body">
            <div className="add-parlament-form">
              <Row className="add-parlament-name">
                <Col>
                  <FloatingLabel label={t("parlamentName")}>
                    <Form.Control
                      className="mb-2"
                      type="input"
                      placeholder="Parlament name"
                      value={parlament.name || ""}
                      isInvalid={inputStatus.parlamentNameInvalid}
                      onChange={(e) => {
                        setInputStatus((s) => {
                          return { ...s, parlamentNameInvalid: false };
                        });
                        setParlament((p) => {
                          return { ...p, name: e.target.value };
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("parlamentNameInvalid")}
                      <InfoTooltip text={t("parlamentNameInvalidTooltip")} />
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  {!state.edit && (
                    <SelectUniversity
                      selectedUni={selectedUni}
                      setSelectedUni={setSelectedUni}
                      invalid={inputStatus.selectedUniInvalid}
                      setInvalid={setSelectedUniInvalid}
                    />
                  )}
                </Col>
              </Row>
              <h5 className="text-center my-1">{t("facultyDetails")}</h5>
              <AddLocationForm
                location={parlament.location}
                setLocation={setLocation}
                state={state}
                imageRef={imageRef}
                imageGalleryRef={imageGalleryRef}
                inputStatus={inputStatus}
                setInputStatus={setInputStatus}
                typeHidden
                verifiedHidden
              />
            </div>

            <AddLocationMap
              location={parlament.location}
              setLocation={setLocation}
              state={state}
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
              {state.edit ? t("editParlament") : t("addParlament")}
            </Button>
          </div>
        </Form>
        <Modal
          centered
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("success")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {state.edit
                ? t("parEditedSuccessfuly")
                : t("parAddedSuccessfuly")}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                setShowAddParlament(false);
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

export default AddParlamentBody;
