import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AdminPanel from "../components/adminPanel/AdminPanel.js";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";
import StudentContext from "../components/studentManager/StudentManager.js";

function ParlamentMemberPage() {
  const { t } = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  return (
    <>
      {student.role === 1 ? (
        <AdminPanel />
      ) : (
        <ResourceNotFound text={t("resNotFound")} />
      )}
    </>
  );
}

export default ParlamentMemberPage;
