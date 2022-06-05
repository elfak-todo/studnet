import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";
import { useTranslation } from "react-i18next";

function StudentSettings({studentProp}) {
    const {t} = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  return student.role === 3 && student.id !== studentProp?.id ? (
    <NavDropdown title={<FontAwesomeIcon icon={faGear} className="settings-icon" />} className="ms-auto">
      <NavDropdown.Item> {t("ban")}</NavDropdown.Item>
      <NavDropdown.Item> {t("promote")}</NavDropdown.Item>
    </NavDropdown>
  ) : null;
}

export default StudentSettings;
