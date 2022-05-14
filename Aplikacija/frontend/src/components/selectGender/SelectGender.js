import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Form } from "react-bootstrap";

function SelectGender() {
  const { t } = useTranslation(["register"]);

  return (
    <Form.Group>
      <Form.Label>{t("gender")}</Form.Label>
      <Row className="mb-2">
        <Col>
          <Form.Check
            inline
            type="radio"
            label={t("male")}
            name="gender"
          ></Form.Check>
          <Form.Check
            inline
            type="radio"
            label={t("female")}
            name="gender"
          ></Form.Check>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default SelectGender;
