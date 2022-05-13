import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

function LoginDescription() {
  const { t } = useTranslation(["login"]);

  return (
    <div className="m-5 text-center">
      <h1>{t("welcome")}</h1>
      <p> {t("subtitle1")}</p>
      <p> {t("subtitle2")}</p>
    </div>
  );
}

export default LoginDescription;
