import { useState } from "react";
import ParlamentTable from "./parlamentTable/ParlamentTable.js";

import StudentTable from "./studentTable/StudentTable.js";
import UniversityTable from "./universityTable/UniversityTable.js";
import AdminMenu from "./adminMenu/AdminMenu.js";

import "./AdminPanel.style.css";

function AdminPanel() {
  const [refresh, setRefresh] = useState(true);
  const [students, setStudents] = useState(null);

  const [showStudentTable, setShowStudentTable] = useState(true);
  const [showUniTable, setUniStudentTable] = useState(false);
  const [showParTable, setParStudentTable] = useState(false);

  return (
    <div className="admin-panel-div">
      <div className="admin-panel-items">
        <AdminMenu
          showStudent={setShowStudentTable}
          showUni={setUniStudentTable}
          showPar={setParStudentTable}
        />
        {showStudentTable && (
          <div className="admin-panel-table">
            <StudentTable
              students={students}
              setStudents={setStudents}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        )}
        {showUniTable && (
          <div className="admin-panel-table">
            <UniversityTable />
          </div>
        )}
        {showParTable && (
          <div className="admin-panel-table">
            <ParlamentTable/>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
