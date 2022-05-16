import "bootstrap/dist/css/bootstrap.min.css";
import { SERVER_ADDRESS } from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectFaculty(props) {
  const { t } = useTranslation(["register"]);
  const [options, setOptions] = useState([]);
  let universityID = 1;
  if(props.selectedUniversity !== undefined){
    universityID = props.selectedUniversity;
  }
  useEffect(() => {
    axios
      .get(
        SERVER_ADDRESS + "Parlament/GetByUniversity/" + universityID
      )
      .then((result) => {
        setOptions(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [universityID]);

  return (
    <FloatingLabel className="mb-2" label={t("chooseFac")}>
      <Form.Select>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.facultyName}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}
export default SelectFaculty;
