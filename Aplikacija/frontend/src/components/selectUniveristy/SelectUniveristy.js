import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectUniversity() {
  const { t } = useTranslation(["register"]);

  return (
    <FloatingLabel
      className="mb-2"
      controlId="selectUniversity"
      label={t("chooseUni")}
    >
      <Form.Select>
        <option value="1">Univerzitet u Nišu</option>
        <option value="2">Univerzitet u Beogradu</option>
      </Form.Select>
    </FloatingLabel>
  );
}

export default SelectUniversity;
