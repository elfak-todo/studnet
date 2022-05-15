import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { SERVER_ADDRESS } from "../../config";
import { useEffect, useState } from "react";

function SelectUniversity() {
  const { t } = useTranslation(["register"]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + "University/GetAll")
      .then((result) => {
        setOptions(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <FloatingLabel
      className="mb-2"
      controlId="selectUniversity"
      label={t("chooseUni")}
    >
      <Form.Select>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default SelectUniversity;
