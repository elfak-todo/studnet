import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";

function SelectLanguage() {
  const { t, i18n } = useTranslation(["navbar"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e);
  };

  return (
    <NavDropdown className="me-5"
      title={t("language")}
      value={localStorage.getItem("i18nextLng")}
      onSelect={handleLanguageChange}
    >
      <NavDropdown.Item eventKey="eng"> {t("english")} </NavDropdown.Item>
      <NavDropdown.Item eventKey="srb"> {t("serbian")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SelectLanguage;
