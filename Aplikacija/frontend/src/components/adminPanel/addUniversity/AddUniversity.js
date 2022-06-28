import { useTranslation } from "react-i18next";
import { Modal, CloseButton } from "react-bootstrap";

import AddUniversityBody from "./addUniversityBody/AddUniversityBody";

import "./AddUniversity.style.css";

function AddUniversity({ showAddUni, setShowAddUni, setUniversities }) {
  const { t } = useTranslation(["admin"]);

  return (
    <Modal
      show={showAddUni}
      centered
      dialogClassName="university-modal"
      onHide={() => setShowAddUni(false)}
    >
      <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
        <Modal.Title>{t("addUniversity")}</Modal.Title>
        <CloseButton variant="white" onClick={() => setShowAddUni(false)} />
      </Modal.Header>
      <Modal.Body className="p-0">
        <AddUniversityBody
          setUniversities={setUniversities}
          setShowAddUni={setShowAddUni}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddUniversity;
