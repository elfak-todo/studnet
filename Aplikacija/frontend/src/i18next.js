import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "sr",
    debug: false,
    ns: [
      "login",
      "register",
      "navbar",
      "locations",
      "homePage",
      "misc",
      "post",
      "parlament",
      "event",
      "students",
      "profile"
    ],
    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
