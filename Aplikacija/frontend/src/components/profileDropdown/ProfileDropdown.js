import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import defaultPic from "../../images/defaultProfilePic.jpg";
import "./ProfileDropdown.style.css";
import StudentContext from "../studentManager/StudentManager.js";

function ProfileDropdown() {
  const { t } = useTranslation(["navbar"]);

  const { student, setStudent } = useContext(StudentContext);

  const logout = () => {
    setStudent(null);
  };

  return (
    <NavDropdown
      className="me-2"
      title={
        <div>
          <Image
            src={defaultPic}
            alt="user-pic"
            className="avatar"
            roundedCircle
          />
          {student && student.name}
        </div>
      }
    >
      <NavDropdown.Item> {t("profile")} </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}> {t("logout")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ProfileDropdown;
