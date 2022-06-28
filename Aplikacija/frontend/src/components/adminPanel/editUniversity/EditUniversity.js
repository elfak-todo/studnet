import { useTranslation } from "react-i18next";
import { Modal, CloseButton } from "react-bootstrap";

import AddUniversityBody from "../addUniversity/addUniversityBody/AddUniversityBody";
import { useEffect, useState } from "react";
import axios from "axios";

function EditParlament({ uniId, showEdit, setShowEdit, setUniversities }) {
  const { t } = useTranslation(["admin"]);

  const [initialUniversity, setInitialUniversity] = useState(null);

  useEffect(() => {
    if (uniId !== undefined && uniId !== null) {
      axios.get(`University/${uniId}`).then((res) => {
        setInitialUniversity(res.data);
        console.log(res.data);
      });
    }
  }, [uniId]);

  return (
    initialUniversity && (
      <Modal
        show={showEdit}
        centered
        dialogClassName="university-modal"
        onHide={() => setShowEdit(false)}
      >
        <Modal.Header style={{ backgroundColor: "#4e54c8", color: "white" }}>
          <Modal.Title>{t("editUniversity")}</Modal.Title>
          <CloseButton variant="white" onClick={() => setShowEdit(false)} />
        </Modal.Header>
        <Modal.Body className="p-0">
          <AddUniversityBody
            initialUniversity={initialUniversity}
            setUniversities={setUniversities}
            setShowAddUni={setShowEdit}
          />
        </Modal.Body>
      </Modal>
    )
  );
}

export default EditParlament;
