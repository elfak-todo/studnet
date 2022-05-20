import "bootstrap/dist/css/bootstrap.min.css";
import defaultPic from "../../images/defaultProfilePic.jpg";
import { NavDropdown, Image } from "react-bootstrap";
import "./ProfileDropdown.style.css";
import { useTranslation } from "react-i18next";

function ProfileDropdown() {
  const { t } = useTranslation(["navbar"]);
  //const name = "Milan Lukic";

  return (
    <NavDropdown className="me-3"
      title={<Image src={defaultPic} className="avatar" roundedCircle />}
    >
      <NavDropdown.Item> {t("profile")} </NavDropdown.Item>
      <NavDropdown.Item> {t("settings")} </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item> {t("logout")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ProfileDropdown;
