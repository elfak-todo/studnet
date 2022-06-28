import { useTranslation } from "react-i18next";
import { Modal, CloseButton } from "react-bootstrap";

import AddParlamentBody from "./addParlamentBody/AddParlamentBody";

function AddParlament({
  showAddParlament,
  setShowAddParlament,
  setParlaments,
}) {
  const { t } = useTranslation(["admin"]);

  return (
    <Modal
      show={showAddParlament}
      centered
      dialogClassName="location-modal"
      onHide={() => setShowAddParlament(false)}
    >
      <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
        <Modal.Title>{t("addParlament")}</Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => setShowAddParlament(false)}
        />
      </Modal.Header>
      <Modal.Body className="p-0">
        <AddParlamentBody
          setParlaments={setParlaments}
          setShowAddParlament={setShowAddParlament}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddParlament;
