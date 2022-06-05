import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

import "./StudentTable.style.css";
import axios from "axios";

function StudentTable({ students, setStudents, refresh, setRefresh }) {
  const { t } = useTranslation(["register", "misc"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!refresh) return;
    axios
      .get("Student/GetAllStudents/0")
      .then((res) => {
        setStudents(res.data);
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [refresh, setRefresh, setStudents]);

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
    <Table striped hover responsive className="shadow">
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
  );
}

export default StudentTable;
