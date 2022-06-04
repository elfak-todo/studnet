import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

import StudentFilter from "../studentFilter/StudentFilter.js";
import StudentSearch from "../studentSearch/StudentSearch.js";
import "./StudentTable.style.css";

function StudentTable() {
  const { t } = useTranslation(["register", "misc"]);

  const navigate = useNavigate();

  const [students, setStudents] = useState(null);

  const getRole = (role) => {
    switch (role) {
      case 0:
        return "Student";
      case 1:
        return t("misc:parlamentMember");
      case 2:
        return t("misc:universityAdmin");
      case 3:
        return t("misc:admin");
      default:
        break;
    }
  };

  return (
    <Container fluid className="mt-3">
      <div className="forms">
        <StudentFilter students={students} setStudents={setStudents} />
        <StudentSearch />
      </div>
      <Table striped hover className="shadow">
        <thead className="student-thead">
          <tr>
            {[
              "",
              "name",
              "username",
              "email",
              "university",
              "faculty",
              "role",
              "gender",
            ].map((col) => (
              <th key={col}> {t(`register:${col}`)} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students?.map((s, i) => (
            <tr key={s.id} onClick={() => navigate("/student/" + s.id)}>
              <td> {i + 1} </td>
              <td>{s.firstName + " " + s.lastName}</td>
              <td>{s.username}</td>
              <td>{s.email}</td>
              <td>{s.universityName}</td>
              <td>{s.facultyName}</td>
              <td>{getRole(s.role)}</td>
              <td>{s.gender === "m" ? t("misc:male") : t("misc:female")} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentTable;
