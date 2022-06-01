import { useTranslation } from "react-i18next";

import logo from "../../images/logo.png";
import "./LoginDescription.style.css";

function LoginDescription() {
  const { t } = useTranslation(["login"]);

  return (
    <div className="mb-5 text-center text-light login-description">
      <img src={logo} alt="logo" className="mb-3" />
      <h1>{t("welcome")}</h1>
    </div>
  );
}

export default LoginDescription;
