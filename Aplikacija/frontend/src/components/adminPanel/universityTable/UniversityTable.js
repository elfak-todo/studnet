import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function UniversityTable() {
  const { t } = useTranslation(["admin"]);

  //TODO Pomeri gore gde ti treba, kao za student
  const [universites, setUniversities] = useState([]);

  useEffect(() => {
    axios.get("University/List/0").then((res) => {
      setUniversities(res.data);
    });
  }, []);

  return (
    <Table striped hover responsive className="shadow">
      <thead className="student-thead">
        <tr>
          {[
            "",
            "name",
            "regFaculties",
            "regStudents",
            "postCount",
            "locationCount",
            "eventCount",
          ].map((col) => (
            <th key={col}> {t(col)} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {universites?.map((u, i) => (
          <tr key={u.id}>
            <td> {i + 1} </td>
            <td>{u.name}</td>
            <td>{u.parlamentCount}</td>
            <td>{u.userCount}</td>
            <td>{u.postCount}</td>
            <td>{u.locationCount}</td>
            <td>{u.eventCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UniversityTable;
