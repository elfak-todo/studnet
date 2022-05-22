import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import StudentContext from "../studentManager/StudentManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";

function SettingsDropdown() {
  const { t } = useTranslation(["post"]);
  const { student } = useContext(StudentContext);

  return (
    <NavDropdown
      className="ms-auto me-2"
      title={
        <div>
          <FontAwesomeIcon icon={faEllipsisV} className="settings-icon" />
        </div>
      }
    >
      <NavDropdown.Item> {t("edit")} </NavDropdown.Item>
      {student.role !== 0 && (
        <>
          <NavDropdown.Item> {t("verify")} </NavDropdown.Item>
          <NavDropdown.Item> {t("pin")} </NavDropdown.Item>
        </>
      )}
      <NavDropdown.Item> {t("delete")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingsDropdown;
