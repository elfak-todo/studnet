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

function AddParlament({ showAddParlament, setShowAddParlament }) {
  const { t } = useTranslation(["admin"]);
  const [parNameInvalid, setParNameInvalid] = useState(false);
  const [facNameInvalid, setFacNameInvalid] = useState(false);

  const parlamentNameRef = useRef();
  const facultyNameRef = useRef();
  
  const handleSubmit = () => {
    const parlamentName = parlamentNameRef.current.value;
    const facultyName = facultyNameRef.current.value;
    parlamentNameRef.current.value = "";
    facultyNameRef.current.value = "";

    if (parlamentName.length <= 0 || parlamentName.length > 32) {
      setParNameInvalid(true);
      return;
    }
    if (facultyName.length <= 0 || facultyName.length > 32) {
      setFacNameInvalid(true);
      return;
    }
    //next
  };
  return (
    <Modal
      show={showAddParlament}
      centered
      dialogClassName="location-modal"
      onHide={() => setShowAddParlament(false)}
    >
      <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
        <Modal.Title>{t("addUniversity")}</Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => setShowAddParlament(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <div style={{ width: "20rem" }}>
            <p className="mb-1">{t("enterParName")}</p>
            <Form>
              <FloatingLabel label={t("parlamentName")} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder={"Parlament name"}
                  isInvalid={parNameInvalid}
                  ref={parlamentNameRef}
                  onChange={() => setParNameInvalid(false)}
                />
                <Form.Control.Feedback type="invalid">
                  {t("enterParName")}
                  <InfoTooltip text={t("parlamentNameInfo")} />
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form>
          </div>
          <div style={{ width: "20rem" }} className="ms-2">
            <p className="mb-1">{t("enterFacName")}</p>
            <Form>
              <FloatingLabel label={t("facultyName")} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder={"Faculty name"}
                  isInvalid={facNameInvalid}
                  ref={facultyNameRef}
                  onChange={() => setFacNameInvalid(false)}
                />
                <Form.Control.Feedback type="invalid">
                  {t("enterFacName")}
                  <InfoTooltip text={t("facultyNameInfo")} />
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
          <Button onClick={handleSubmit}> {t("addParlament")}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddParlament;
