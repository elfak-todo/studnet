import { useState } from "react";
import ParlamentTable from "./parlamentTable/ParlamentTable.js";

import StudentTable from "./studentTable/StudentTable.js";
import UniversityTable from "./universityTable/UniversityTable.js";
import AdminMenu from "./adminMenu/AdminMenu.js";

import "./AdminPanel.style.css";

function AdminPanel() {
  const [students, setStudents] = useState(null);

  const [showStudentTable, setShowStudentTable] = useState(true);
  const [showUniTable, setUniStudentTable] = useState(false);
  const [showParTable, setParStudentTable] = useState(false);

  const [fetching, setFetching] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  
  return (
    <div className="admin-panel-div">
      <div className="admin-panel-items">
        <AdminMenu
          showStudent={setShowStudentTable}
          showUni={setUniStudentTable}
          showPar={setParStudentTable}
          setStudents={setStudents}
          pageNum={pageNum}
          setPageNum={setPageNum}
          setHasMore={setHasMore}
          setFetching={setFetching}
        />
        {showStudentTable && (
          <div className="admin-panel-table">
            <StudentTable
              students={students}
              setPageNum={setPageNum}
              hasMore={hasMore}
              fetching={fetching}
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
            <ParlamentTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
