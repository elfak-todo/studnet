import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  FloatingLabel,
  Spinner,
  CloseButton,
} from "react-bootstrap";

import "./PasswordSettings.style.css";

function PasswordSettings({ student, showPassModal, setShowPassModal }) {
  const { t } = useTranslation(["profile", "register"]);

  const [loading, setLoading] = useState(false);

  const [oldPassInvalid, setOldPassInvalid] = useState(false);
  const [newPassInvalid, setNewPassInvalid] = useState(false);
  const [passError, setPassError] = useState("Error");

  const oldPassRef = useRef();
  const newPassRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const oldPass = oldPassRef.current.value;
    const newPass = newPassRef.current.value;

    let proceed = true;

    if (oldPass === "") {
      setOldPassInvalid(true);
      proceed = false;
    }
    if (newPass.length < 6) {
      setNewPassInvalid(true);
      setPassError(t("register:passwordLength"));
      proceed = false;
    }

    if (proceed) {
      setLoading(true);
      //TODO
      console.log(oldPass, newPass);
      closeModal();

      setLoading(false);
    } else return;
  };

  const closeModal = () => {
    setShowPassModal(false);
    setOldPassInvalid(false);
    setNewPassInvalid(false);
  };

  return (
    <Modal show={showPassModal} size="md" centered backdrop="static">
      <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
        <Modal.Title style={{ color: "white" }}>{t("changePass")}</Modal.Title>
        <CloseButton variant="white" onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={submitHandler}>
          <FloatingLabel label={t("oldPass")} className="mb-2">
            <Form.Control
              type="password"
              placeholder={"Enter old password"}
              isInvalid={oldPassInvalid}
              ref={oldPassRef}
              onChange={() => {
                setOldPassInvalid(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterOldPass")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label={t("newPass")} className="mb-2">
            <Form.Control
              type="password"
              placeholder={"Enter new password"}
              isInvalid={newPassInvalid}
              ref={newPassRef}
              onChange={() => {
                setNewPassInvalid(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {passError}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="center-button">
            <Button type="submit" size="md">
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {t("misc:saveChanges")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PasswordSettings;
