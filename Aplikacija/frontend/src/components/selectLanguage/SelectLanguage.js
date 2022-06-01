import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";

function SelectLanguage() {
  const { t, i18n } = useTranslation(["navbar"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e);
  };

  return (
    <NavDropdown
      className=""
      title={<span className="text-light">{t("language")}</span>}
      value={localStorage.getItem("i18nextLng")}
      onSelect={handleLanguageChange}
    >
      <NavDropdown.Item eventKey="en">{t("english")}</NavDropdown.Item>
      <NavDropdown.Item eventKey="sr"> {t("serbian")} </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SelectLanguage;
