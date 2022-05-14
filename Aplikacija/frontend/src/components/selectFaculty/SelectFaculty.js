import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectFaculty() {
  const { t } = useTranslation(["register"]);

  return (
    <FloatingLabel
      className="mb-2"
      controlId="selectFaculty"
      label={t("chooseFac")}
    >
      <Form.Select>
        <option value="1">Elektronski fakultet</option>
        <option value="2">Medicinski fakultet</option>
        <option value="3">Pravni fakultet</option>
        <option value="3">Ekonomski fakultet</option>
      </Form.Select>
    </FloatingLabel>
  );
}
export default SelectFaculty;
