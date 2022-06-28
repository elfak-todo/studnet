import { useContext, useEffect, useState } from "react";

import ParlamentTable from "./parlamentTable/ParlamentTable.js";
import StudentTable from "./studentTable/StudentTable.js";
import UniversityTable from "./universityTable/UniversityTable.js";
import AdminMenu from "./adminMenu/AdminMenu.js";
import StudentContext from "../studentManager/StudentManager.js";

import "./AdminPanel.style.css";
import ParlamentOverview from "./parlamentOverview/ParlamentOverview.js";
import EditParlament from "./editParlament/EditParlament.js";

function AdminPanel() {
  const { student } = useContext(StudentContext);

  const [students, setStudents] = useState(null);
  const [parId, setParId] = useState(null);

  const [showStudentTable, setShowStudentTable] = useState(false);
  const [showUniTable, setUniStudentTable] = useState(false);
  const [showParTable, setParStudentTable] = useState(false);
  const [showParOverview, setShowParOverview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [fetching, setFetching] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (student.role === 1) {
      setShowParOverview(true);
    } else {
      setShowStudentTable(true);
    }
  }, [student]);

  return (
    <div className="admin-panel-div">
      <div className="admin-panel-items">
        <AdminMenu
          showStudent={setShowStudentTable}
          showUni={setUniStudentTable}
          showPar={setParStudentTable}
          setShowParOverview={setShowParOverview}
          setStudents={setStudents}
          pageNum={pageNum}
          setPageNum={setPageNum}
          setHasMore={setHasMore}
          setFetching={setFetching}
          setShowEdit={setShowEdit}
          setParId={setParId}
        />
        {showStudentTable && student.role > 0 && (
          <div className="admin-panel-table">
            <StudentTable
              students={students}
              setPageNum={setPageNum}
              hasMore={hasMore}
              fetching={fetching}
            />
          </div>
        )}
        {showUniTable && student.role === 3 && (
          <div className="admin-panel-table">
            <UniversityTable />
          </div>
        )}
        {showParTable && student.role > 1 && (
          <div className="admin-panel-table">
            <ParlamentTable />
          </div>
        )}
        {student.role === 1 && showParOverview && (
          <ParlamentOverview showEdit={showEdit} setShowEdit={setShowEdit} />
        )}
        <EditParlament
          parId={parId}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
