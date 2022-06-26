import { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StudentSearch from "../studentSearch/StudentSearch";
import AddUniversity from "../addUniversity/AddUniversity";
import AddParlament from "../addParlament/AddParlament";
import StudentContext from "../../studentManager/StudentManager";

import "./AdminMenu.style.css";

function AdminMenu({
  showStudent,
  showUni,
  showPar,
  setShowParOverview,
  setStudents,
  pageNum,
  setPageNum,
  setHasMore,
  fetching,
  setFetching,
  setShowEdit,
  setParId,
}) {
  const { t } = useTranslation(["admin"]);

  const { student } = useContext(StudentContext);

  const [showAddUni, setShowAddUni] = useState(false);
  const [showAddPar, setShowAddPar] = useState(false);

  const [searchDisabled, setSearchDisabled] = useState(false);

  return (
    <>
      <Card className="admin-menu" bg="primary-light">
        <Card.Body>
          <p style={{ color: "#4e54c8", fontWeight: "600" }} className="mb-0">
            {student.role === 3
              ? t("adminPanel")
              : student.role === 2
              ? t("uniAdminPanel")
              : student.role === 1 && t("parlamentPanel")}
          </p>
          <div className="admin-menu-items">
            <StudentSearch
              setStudents={setStudents}
              pageNum={pageNum}
              setPageNum={setPageNum}
              setHasMore={setHasMore}
              fetching={fetching}
              setFetching={setFetching}
              searchDisabled={searchDisabled}
            />
            <div className="admin-menu-navs">
              {student.role === 1 && (
                <p
                  onClick={() => {
                    showStudent(false);
                    setSearchDisabled(true);
                    setShowParOverview(true);
                  }}
                >
                  {t("parlamentTable")}
                </p>
              )}
              <p
                onClick={() => {
                  showStudent(true);
                  showUni(false);
                  showPar(false);
                  setSearchDisabled(false);
                  setShowParOverview(false);
                }}
              >
                {t("studentTable")}
              </p>
              {student.role === 3 && (
                <p
                  onClick={() => {
                    showStudent(false);
                    showUni(true);
                    showPar(false);
                    setSearchDisabled(true);
                  }}
                >
                  {t("universityTable")}
                </p>
              )}
              {student.role > 1 && (
                <p
                  onClick={() => {
                    showStudent(false);
                    showUni(false);
                    showPar(true);
                    setSearchDisabled(true);
                  }}
                >
                  {t("parlamentTable")}
                </p>
              )}
            </div>
            <div className="admin-menu-btn-div">
              {student.role > 1 && (
                <>
                  {student.role === 3 && <Button
                    className="admin-menu-btn"
                    onClick={() => setShowAddUni(true)}
                  >
                    {t("addUniversity")}
                  </Button>}
                  <Button
                    className="mt-2 admin-menu-btn"
                    onClick={() => setShowAddPar(true)}
                  >
                    {t("addParlament")}
                  </Button>
                </>
              )}
              {student.role === 1 && (
                <Button
                  className="mt-2 admin-menu-btn"
                  onClick={() => {
                    setShowEdit(true);
                    setParId(0);
                  }}
                >
                  {t("editParlament")}
                </Button>
              )}
              {student.role === 2 && (
                <Button
                  className="mt-2 admin-menu-btn"
                >
                  {t("editUniversity")}
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      <AddUniversity showAddUni={showAddUni} setShowAddUni={setShowAddUni} />
      <AddParlament
        showAddParlament={showAddPar}
        setShowAddParlament={setShowAddPar}
      />
    </>
  );
}

export default AdminMenu;
