import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function SelectFaculty({
  selectedUni,
  selectedFac,
  setSelectedFac,
  invalid,
  setInvalid,
  selectDisabled,
}) {
  const { t } = useTranslation(["register"]);

  const [options, setOptions] = useState([]);
  const [clearSelect, setClearSelect] = useState(false);

  useEffect(() => {
    if (selectedUni !== undefined && selectedUni !== "0") {
      axios.get("Parlament/GetByUniversity/" + selectedUni).then((result) => {
        setOptions(result.data);
        setClearSelect(false);
      });
    }
  }, [selectedUni]);

  useEffect(() => {
    if (selectedUni === "0") {
      setClearSelect(true);
      setSelectedFac("0");
    }
  }, [selectedUni, setSelectedFac]);

  return (
    <FloatingLabel className="mb-2" label={t("faculty")}>
      <Form.Select
        isInvalid={invalid}
        value={selectedFac}
        disabled={selectDisabled}
        onChange={(e) => {
          setSelectedFac(e.target.value);
          setInvalid(false);
        }}
      >
        <option value={0}> {t("chooseFac")} </option>
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
