import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";

function SettingsDropdown({ selectedAction }) {
  const { t } = useTranslation(["post"]);
  const { student } = useContext(StudentContext);

  const selectHandler = (keyEvent) => {
    selectedAction(keyEvent);
  };

  return (
    <NavDropdown
      onSelect={selectHandler}
      className="ms-auto"
      title={
        <div>
          <FontAwesomeIcon icon={faEllipsisV} className="settings-icon" />
        </div>
      }
    >
      <NavDropdown.Item eventKey="edit"> {t("edit")} </NavDropdown.Item>
      {student.role !== 0 && (
        <>
          <NavDropdown.Item eventKey="verify"> {t("verify")} </NavDropdown.Item>
          <NavDropdown.Item eventKey="pin"> {t("pin")} </NavDropdown.Item>
        </>
      )}
      <NavDropdown.Item eventKey="delete"> {t("delete")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingsDropdown;
