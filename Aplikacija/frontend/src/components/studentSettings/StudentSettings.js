import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { NavDropdown, Spinner } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";
import { useTranslation } from "react-i18next";

function StudentSettings({ studentProp }) {
  const { t } = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);

  const promoteToParlamentMember = () => {
    if (!loading) {
      setLoading(true);
    }
  };

  const promoteToUniAdmin = () => {
    if (!loading) {
      setLoading(true);
    }
  };

  const promoteToAdmin = () => {
    if (!loading) {
      setLoading(true);
    }
  };

  const ban = () => {
    if (!loading) {
      setLoading(true);
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
    <NavDropdown
      title={<FontAwesomeIcon icon={faGear} className="settings-icon" />}
      className="ms-auto"
    >
      {studentProp.role === 0 && (
        <NavDropdown.Item onClick={promoteToParlamentMember}>
          {t("promoteToParlamentMember")}
        </NavDropdown.Item>
      )}
      {student.role > 1 && studentProp.role <= 1 && (
        <>
          <NavDropdown.Item onClick={promoteToUniAdmin}>
            {t("promoteToUniAdmin")}
          </NavDropdown.Item>
          {student.role > 2 && studentProp.role <= 2 && (
            <NavDropdown.Item onClick={promoteToAdmin}>
              {t("promoteToAdmin")}
            </NavDropdown.Item>
          )}
          <NavDropdown.Item onClick={ban}> {t("ban")}</NavDropdown.Item>
        </>
      )}
    </NavDropdown>
  );
}

export default StudentSettings;
