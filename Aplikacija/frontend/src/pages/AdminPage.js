import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AdminPanel from "../components/adminPanel/AdminPanel";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound";
import StudentContext from "../components/studentManager/StudentManager";

function AdminPage() {
  const { t } = useTranslation(["misc"]);

  const { student } = useContext(StudentContext);

  return (
    <>
      {student.role === 3 ? (
        <AdminPanel />
      ) : (
        <ResourceNotFound text={t("resNotFound")} />
      )}
    </>
  );
}

export default AdminPage;
