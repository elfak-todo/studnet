import { useTranslation } from "react-i18next";
import { Modal, CloseButton } from "react-bootstrap";

import AddParlamentBody from "../addParlament/addParlamentBody/AddParlamentBody";
import { useEffect, useState } from "react";
import axios from "axios";

function EditParlament({ parId, showEdit, setShowEdit, setParlaments }) {
  const { t } = useTranslation(["admin"]);

  const [initialParlament, setInitialParlament] = useState(null);

  useEffect(() => {
    if (parId !== undefined && parId !== null) {
      axios.get(`Parlament/${parId}`).then((res) => {
        setInitialParlament(res.data);
      });
    }
  }, [parId]);

  return (
    initialParlament && (
      <Modal
        show={showEdit}
        centered
        dialogClassName="location-modal"
        onHide={() => setShowEdit(false)}
      >
        <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
          <Modal.Title>{t("editParlament")}</Modal.Title>
          <CloseButton variant="white" onClick={() => setShowEdit(false)} />
        </Modal.Header>
        <Modal.Body className="p-0">
          <AddParlamentBody
            initialParlament={initialParlament}
            setParlaments={setParlaments}
            setShowAddParlament={setShowEdit}
          />
        </Modal.Body>
      </Modal>
    )
  );
}

export default EditParlament;
