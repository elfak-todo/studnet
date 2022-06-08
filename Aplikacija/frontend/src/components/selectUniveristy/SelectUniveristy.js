import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectUniversity({
  selectedUni,
  setSelectedUni,
  invalid,
  setInvalid,
}) {
  const { t } = useTranslation(["register"]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("University/GetAll")
      .then((result) => {
        setOptions(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <FloatingLabel className="mb-2" label={t("university")}>
      <Form.Select
        isInvalid={invalid}
        value={selectedUni}
        onChange={(e) => {
          setSelectedUni(e.target.value);
          setInvalid(false);
        }}
      >
        <option value={0}>{t("chooseUni")}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {t("selectUni")}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default SelectUniversity;
