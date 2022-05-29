import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavDropdown, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressBook,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import defaultPic from "../../images/defaultProfilePic.jpg";
import StudentContext from "../studentManager/StudentManager.js";

import "./ProfileDropdown.style.css";

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
            src={
              (student !== null && student.ImagePath === "/") ||
              (student === null ||
              student.ImagePath === "/")
                ? defaultPic 
                : student.imagePath
            }
            alt="user-pic"
            className="avatar"
            roundedCircle
          />
          {student && student.name}
        </div>
      }
    >
      <NavDropdown.Item>
        <FontAwesomeIcon icon={faUser} className="comment-like-icon-sm" />
        {t("profile")}
      </NavDropdown.Item>
      <NavDropdown.Item>
        <FontAwesomeIcon
          icon={faAddressBook}
          className="comment-like-icon-sm"
        />
        {t("myPosts")}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="comment-like-icon-sm"
        />
        {t("logout")}
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ProfileDropdown;
