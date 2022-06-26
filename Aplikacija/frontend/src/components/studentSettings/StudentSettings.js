import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Button, Modal, NavDropdown, Spinner } from "react-bootstrap";
import axios from "axios";

import StudentContext from "../studentManager/StudentManager";
import { useTranslation } from "react-i18next";
//import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

function StudentSettings({ studentProp, setStudentProp }) {
  const { t } = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);
  const [succesModal, setSuccessModal] = useState({ shown: false });

  const changeStudentRole = (role) => {
    if (!loading) {
      setLoading(true);
      axios
        .patch(`Student/${studentProp.id}/Role/${role}`)
        .then((res) => {
          setSuccessModal({
            shown: true,
            text: t("studentPromoted"),
          });
          setStudentProp((student) => {
            return { ...student, role: res.data };
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toggleStudentBanned = () => {
    if (!loading) {
      setLoading(true);
      axios
        .patch(`Student/${studentProp.id}/Ban/${!studentProp.isBanned}`)
        .then((res) => {
          setSuccessModal({
            shown: true,
            text: t(res.data ? "studentBanned" : "studentUnbanned"),
          });
          setStudentProp((student) => {
            return { ...student, isBanned: res.data };
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const deleteStudent = () => {
    if (!loading) {
      setLoading(true);
      axios
        .delete(`Student/${studentProp.id}`)
        .then((res) => {
          setSuccessModal({
            shown: true,
            text: t("studentDeleted"),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (
    !studentProp ||
    student.role === 0 ||
    studentProp.role >= student.role ||
    student.id === studentProp.id
  ) {
    return null;
  }

  if (loading) {
    return (
      <Spinner
        animation="border"
        size="sm"
        variant="primary"
        className="ms-auto me-4 mt-2"
      ></Spinner>
    );
  }

  return (
    <>
      <NavDropdown
        title={<FontAwesomeIcon icon={faGear} className="settings-icon" />}
        className="ms-auto"
      >
        
        {studentProp.role === 0 && studentProp.isExchange(
          <NavDropdown.Item
            onClick={() => {
              changeStudentRole(1);
            }}
          >
            {t("promoteToParlamentMember")}
          </NavDropdown.Item>
        )}
        {student.role > 1 && studentProp.role <= 1 && (
          <>
            <NavDropdown.Item
              onClick={() => {
                changeStudentRole(2);
              }}
            >
              {t("promoteToUniAdmin")}
            </NavDropdown.Item>
            {student.role > 2 && studentProp.role <= 2 && (
              <NavDropdown.Item
                onClick={() => {
                  changeStudentRole(3);
                }}
              >
                {t("promoteToAdmin")}
              </NavDropdown.Item>
            )}

            <NavDropdown.Item onClick={toggleStudentBanned}>
              {studentProp.isBanned ? t("unban") : t("ban")}
            </NavDropdown.Item>

            <NavDropdown.Item onClick={deleteStudent}>
              {t("delete")}
            </NavDropdown.Item>
          </>
        )}
      </NavDropdown>
      <Modal
        show={succesModal.shown}
        onHide={() => setSuccessModal({ shown: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("success")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{succesModal.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setSuccessModal({ shown: false })}
          >
            {t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* TODO {<ConfirmationDialog />} */}
    </>
  );
}

export default StudentSettings;
