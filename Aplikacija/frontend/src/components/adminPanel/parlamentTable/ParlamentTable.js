import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function ParlamentTable() {
  const { t } = useTranslation(["admin"]);

  //TODO Pomeri gore gde ti treba, kao za student
  const [parlaments, setParlaments] = useState([]);

  useEffect(() => {
    axios.get("Parlament/List/0").then((res) => {
      setParlaments(res.data);
    });
  }, []);

  return (
    <Table striped hover responsive className="shadow">
      <thead className="student-thead">
        <tr>
          {[
            "",
            "parlamentName",
            "facultyName",
            "memberCount",
            "eventCount",
          ].map((col) => (
            <th key={col}> {t(col)} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {parlaments?.map((p, i) => (
          <tr key={p.id}>
            <td> {i + 1} </td>
            <td>{p.name}</td>
            <td>{p.facultyName}</td>
            <td>{p.memberCount}</td>
            <td>{p.eventCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ParlamentTable;
