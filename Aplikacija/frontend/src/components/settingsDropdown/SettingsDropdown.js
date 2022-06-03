import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";

import StudentContext from "../studentManager/StudentManager";

function SettingsDropdown({ author, selectedAction, verified, pinned, className }) {
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
          <FontAwesomeIcon icon={faEllipsisV} className={className}/>
        </div>
      }
    >
      {author?.id === student.id && <NavDropdown.Item eventKey="edit"> {t("edit")} </NavDropdown.Item>}
      {student.role !== 0 && (
        <>
          <NavDropdown.Item eventKey="verify">
            {!verified ? t("verify") : t("unverify")}
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="pinn">
            {!pinned ? t("pin") : t("unpin")}
          </NavDropdown.Item>
        </>
      )}
      <NavDropdown.Item eventKey="delete"> {t("delete")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingsDropdown;
