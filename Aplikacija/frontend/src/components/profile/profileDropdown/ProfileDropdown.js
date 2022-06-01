import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressBook,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import StudentContext from "../../studentManager/StudentManager.js";

import "./ProfileDropdown.style.css";

function ProfileDropdown() {
  const { t } = useTranslation(["navbar"]);

  const { student, setStudent } = useContext(StudentContext);

  const logout = () => {
    setStudent(null);
  };

  return (
    <NavDropdown
      title={
        <span>
          <img
            src={
              !student || student.imagePath === "/"
                ? defaultPic
                : student.imagePath
            }
            alt="user-pic"
            className="avatar"
          ></img>
          <span className="text-light">{student && student.name}</span>
        </span>
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
