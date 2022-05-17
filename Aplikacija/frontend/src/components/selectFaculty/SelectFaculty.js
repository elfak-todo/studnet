import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { SERVER_ADDRESS } from "../../config";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectFaculty(props) {
  const { t } = useTranslation(["register"]);

  const [options, setOptions] = useState([]);
  const [clearSelect, setClearSelect] = useState(false);

  const defaultOption = 0;

  useEffect(() => {
    if (props.selectedUniversity === defaultOption) {
      setClearSelect(true);
    }

    if (
      props.selectedUniversity !== undefined &&
      props.selectedUniversity !== defaultOption
    ) {
      axios
        .get(
          SERVER_ADDRESS +
            "Parlament/GetByUniversity/" +
            props.selectedUniversity
        )
        .then((result) => {
          setOptions(result.data);
          setClearSelect(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.selectedUniversity]);

  return (
    <FloatingLabel className="mb-2" label={t("faculty")}>
      <Form.Select
        isInvalid={props.invalid}
        onChange={(e) => {
          props.selectedFaculty(e.target.selectedIndex);
          props.setInvalid(false);
        }}
      >
        <option> {t("chooseFac")} </option>
        {clearSelect ||
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.facultyName}
            </option>
          ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {t("selectFac")}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}
export default SelectFaculty;
