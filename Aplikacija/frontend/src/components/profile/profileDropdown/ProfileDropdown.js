import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import StudentContext from "../../studentManager/StudentManager.js";

import "./ProfileDropdown.style.css";

function ProfileDropdown({ setExpanded }) {
  const { t } = useTranslation(["navbar"]);

  const navigate = useNavigate();

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
          <span className="text-light m-0 p-0">
            {student && student.firstName + " " + student.lastName}
          </span>
        </span>
      }
    >
      <NavDropdown.Item
        onClick={() => {
          navigate("/student/" + student.id);
          setExpanded(false);
        }}
      >
        <FontAwesomeIcon
          icon={faUser}
          className="comment-like-icon-sm"
          style={{ color: "#4e54c8" }}
        />
        {t("profile")}
      </NavDropdown.Item>
      {student?.role === 3 && (
        <NavDropdown.Item
          onClick={() => {
            navigate("/admin");
            setExpanded(false);
          }}
        >
          <FontAwesomeIcon
            icon={faGears}
            className="comment-like-icon-sm"
            style={{ color: "#4e54c8" }}
          />
          {t("admin")}
        </NavDropdown.Item>
      )}
      {student?.role === 1 && (
        <NavDropdown.Item
          onClick={() => {
            navigate("/parlament");
            setExpanded(false);
          }}
        >
          <FontAwesomeIcon
            icon={faGears}
            className="comment-like-icon-sm"
            style={{ color: "#4e54c8" }}
          />
          {t("parlament")}
        </NavDropdown.Item>
      )}
      {student?.role === 2 && (
        <NavDropdown.Item
          onClick={() => {
            navigate("/university");
            setExpanded(false);
          }}
        >
          <FontAwesomeIcon
            icon={faGears}
            className="comment-like-icon-sm"
            style={{ color: "#4e54c8" }}
          />
          {t("university")}
        </NavDropdown.Item>
      )}
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="comment-like-icon-sm"
          style={{ color: "#4e54c8" }}
        />
        {t("logout")}
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ProfileDropdown;
