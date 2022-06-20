import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ModPannel from "../components/modPannel/ModPannel";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound";
import StudentContext from "../components/studentManager/StudentManager";

function ModPage() {
  const { t } = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  return (
    <>
      {student.role >= 1 ? (
        <ModPannel />
      ) : (
        <ResourceNotFound text={t("resNotFound")} />
      )}
    </>
  );
}

export default ModPage;
