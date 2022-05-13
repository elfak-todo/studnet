import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

function SelectLanguage() {
  const { i18n } = useTranslation(["login"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select className="mt-3"
      value={localStorage.getItem("i18nextLng")}
      onChange={handleLanguageChange}
    >
      <option value="eng"> ENG </option>
      <option value="srb"> SRP </option>
    </select>
  );
}

export default SelectLanguage;
