import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound";
import StudentContext from "../components/studentManager/StudentManager";
import StudentTable from "../components/studentTable/StudentTable";

function AdminPage() {
  const { t } = useTranslation(["misc"]);

  const {student} = useContext(StudentContext);

  return (
    <Container>
      {student.role === 3 ? (
        <StudentTable />
      ) : (
        <ResourceNotFound text={t("resNotFound")} />
      )}
    </Container>
  );
}

export default AdminPage;
