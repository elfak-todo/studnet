import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StudentSearch from "../studentSearch/StudentSearch";
import AddUniversity from "../addUniversity/AddUniversity";
import AddParlament from "../addParlament/AddParlament";
import "./AdminMenu.style.css";

function AdminMenu({ showStudent, showUni, showPar, setStudents }) {
  const { t } = useTranslation(["admin"]);

  const [showAddUni, setShowAddUni] = useState(false);
  const [showAddPar, setShowAddPar] = useState(false);

  return (
    <>
      <Card className="admin-menu" bg="primary-light">
        <Card.Body>
          <div className="admin-menu-items">
            <StudentSearch setStudents={setStudents} />
            <div className="admin-menu-navs">
              <p
                onClick={() => {
                  showStudent(true);
                  showUni(false);
                  showPar(false);
                }}
              >
                {t("studentTable")}
              </p>
              <p
                onClick={() => {
                  showStudent(false);
                  showUni(true);
                  showPar(false);
                }}
              >
                {t("universityTable")}
              </p>
              <p
                onClick={() => {
                  showStudent(false);
                  showUni(false);
                  showPar(true);
                }}
              >
                {t("parlamentTable")}
              </p>
            </div>
            <div className="admin-menu-btn-div">
              <Button
                className="admin-menu-btn"
                onClick={() => setShowAddUni(true)}
              >
                {t("addUniversity")}
              </Button>
              <Button
                className="mt-2 admin-menu-btn"
                onClick={() => setShowAddPar(true)}
              >
                {t("addParlament")}
              </Button>
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
