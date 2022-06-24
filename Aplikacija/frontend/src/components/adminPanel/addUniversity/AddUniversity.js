import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  CloseButton,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";

import AddLocation from "../../addLocation/AddLocation";
import InfoTooltip from "../../infoTooltip/InfoTooltip";

function AddUniversity({ showAddUni, setShowAddUni }) {
  const { t } = useTranslation(["admin"]);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [errMessage, setErrMessage] = useState("Error");

  const uniNameRef = useRef();

  const handleSubmit = () => {
    const universityName = uniNameRef.current.value;
    uniNameRef.current.value = "";

    if (universityName.length <= 0 || universityName.length > 32) {
      setNameInvalid(true);
      setErrMessage(t("enterUniName"));
      return;
    }
    console.log(universityName);
    //next
  };
  return (
    <Modal
      show={showAddUni}
      centered
      dialogClassName="location-modal"
      onHide={() => setShowAddUni(false)}
    >
      <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
        <Modal.Title>{t("addUniversity")}</Modal.Title>
        <CloseButton variant="white" onClick={() => setShowAddUni(false)} />
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <div style={{ width: "20rem" }}>
            <p className="mb-1">{t("enterUniName")}</p>
            <Form>
              <FloatingLabel label={t("universityName")} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder={"University name"}
                  isInvalid={nameInvalid}
                  ref={uniNameRef}
                  onChange={() => setNameInvalid(false)}
                />
                <Form.Control.Feedback type="invalid">
                  {errMessage} <InfoTooltip text={t("uniInfo")} />
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form>
          </div>
        </div>
        <AddLocation
          initialLocation={null}
          redirect={false}
          displayTitle={false}
        />
        <div className="text-center">
          <Button onClick={handleSubmit}> {t("addUniversity")}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddUniversity;
