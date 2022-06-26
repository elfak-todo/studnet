import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import {
  CloseButton,
  Container,
  Modal,
  Image,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";

import noPic from "../../../images/no-image.jpg";
import "./EditParlament.style.css";

function EditParlament({ parId, showEdit, setShowEdit }) {
  const { t } = useTranslation(["admin", "info"]);

  const [parlament, setParlament] = useState(null);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [picInvalid, setPicInvalid] = useState(false);

  const [errMessage /*setErrMessage*/] = useState("Error");

  const parNameRef = useRef();
  const picRef = useRef();

  useEffect(() => {
    if (parId === null) return;
    axios
      .get(`Parlament/${parId}`)
      .then((res) => {
        setParlament(res.data);
      })
      .catch((err) => console.log(err));
  }, [parId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parNameRef.current.value);
  };

  return (
    <Modal show={showEdit} size="lg" onHide={() => setShowEdit(false)} centered>
      <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
        <Modal.Title>{t("editParlament")}</Modal.Title>
        <CloseButton variant="white" onClick={() => setShowEdit(false)} />
      </Modal.Header>
      <Modal.Body className="px-0 m-0 p-0">
        <Container fluid className="mx-auto px-0">
          <div className="edit-par-items-div text-center">
            <div className="edit-par-pic-div">
              <Image
                src={
                  parlament?.facultyImagePath === "" ||
                  parlament?.facultyImagePath === null
                    ? noPic
                    : parlament?.facultyImagePath
                }
                alt="par-pic"
                className="edit-par-pic"
              />
            </div>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Label>{t("parlamentPic")}</Form.Label>
              <Form.Control
                type="file"
                className="mb-2"
                isInvalid={picInvalid}
                ref={picRef}
                onChange={() => {
                  setPicInvalid(false);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {t("info:pic")}
              </Form.Control.Feedback>
              <FloatingLabel label={t("parlamentName")} className="mb-2">
                <Form.Control
                  type="input"
                  placeholder={"Enter parlament name"}
                  isInvalid={nameInvalid}
                  defaultValue={parlament?.parlamentName}
                  ref={parNameRef}
                  onChange={() => {
                    setNameInvalid(false);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errMessage}
                </Form.Control.Feedback>
              </FloatingLabel>
              <div className="text-center">
                <Button type="submit" className="mb-2">
                  {t("saveChanges")}
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default EditParlament;
