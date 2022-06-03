import { useTranslation } from "react-i18next";
import { Row, Col, Form } from "react-bootstrap";

import "./SelectGender.style.css";

function SelectGender({ defaultValue, ...props }) {
  const { t } = useTranslation(["register"]);

  return (
    <Form.Group>
      <Form.Label>{t("gender")}</Form.Label>
      <Row className="mb-2">
        <Col>
          <Form.Check
            isInvalid={props.invalid}
            onChange={(e) => {
              props.selectedGender(e.target.value);
              props.setInvalid(false);
            }}
            inline
            type="radio"
            value="m"
            defaultChecked={defaultValue === "m"}
            label={t("male")}
            name="gender"
            className="gender-checkbox"
          ></Form.Check>
          <Form.Check
            isInvalid={props.invalid}
            onChange={(e) => {
              props.selectedGender(e.target.value);
              props.setInvalid(false);
            }}
            inline
            type="radio"
            value="f"
            defaultChecked={defaultValue === "f"}
            label={t("female")}
            name="gender"
            className="gender-checkbox"
          ></Form.Check>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default SelectGender;
