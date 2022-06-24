import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";

function ParlamentTable() {
  const { t } = useTranslation(["admin"]);
  return (
    <Table striped hover responsive className="shadow">
      <thead className="student-thead">
        <tr>
          {["", "parlamentName", "facultyName", "regStudents"].map((col) => (
            <th key={col}> {t(col)} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> 1</td>
          <td> SPEFF </td>
          <td>Elektronski fakultet</td>
          <td>10</td>
        </tr>
        <tr>
          <td> 1</td>
          <td> SPEFF </td>
          <td>Elektronski fakultet</td>
          <td>10</td>
        </tr>
        <tr>
          <td> 1</td>
          <td> SPEFF </td>
          <td>Elektronski fakultet</td>
          <td>10</td>
        </tr>
        <tr>
          <td> 1</td>
          <td> SPEFF </td>
          <td>Elektronski fakultet</td>
          <td>10</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ParlamentTable;
