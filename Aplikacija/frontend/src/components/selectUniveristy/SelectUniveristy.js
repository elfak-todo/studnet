import "bootstrap/dist/css/bootstrap.min.css";
import { SERVER_ADDRESS } from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function SelectUniversity(props) {
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
    <FloatingLabel className="mb-2" label={t("chooseUni")}>
      <Form.Select onChange={(e) => props.selectedUniversity(e.target.value)}>
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
