import "bootstrap/dist/css/bootstrap.min.css";
import "./PostHeader.style.css";
import luka from "../../../images/posts/luka.jpg";
import StudentContext from "../../studentManager/StudentManager";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Image, Card, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function PostHeader() {
  const { t } = useTranslation(["post"]);
  const { student } = useContext(StudentContext);

  return (
    <div className="post-header">
      <Image
        src={luka}
        alt="user-pic"
        className="post-profile-pic"
        roundedCircle
      />
      <div>
        <Card.Text className="post-header-name"> Luka Kocić </Card.Text>
        <Card.Text className="post-header-faculty">
          Elektronski fakultet
        </Card.Text>
      </div>
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
    </div>
  );
}

export default PostHeader;
