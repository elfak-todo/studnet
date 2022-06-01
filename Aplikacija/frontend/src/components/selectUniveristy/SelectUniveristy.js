import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectUniversity(props) {
  const { t } = useTranslation(["register"]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("University/GetAll")
      .then((result) => {
        setOptions(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <FloatingLabel className="mb-2" label={t("university")}>
      <Form.Select
        isInvalid={props.invalid}
        onChange={(e) => {
          props.selectedUniversity(e.target.selectedIndex);
          props.setInvalid(false);
        }}
      >
        <option>{t("chooseUni")}</option>
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
