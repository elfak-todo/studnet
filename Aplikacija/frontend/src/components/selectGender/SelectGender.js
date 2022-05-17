import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Form } from "react-bootstrap";

function SelectGender(props) {
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
            label={t("male")}
            name="gender"
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
            label={t("female")}
            name="gender"
          ></Form.Check>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default SelectGender;
