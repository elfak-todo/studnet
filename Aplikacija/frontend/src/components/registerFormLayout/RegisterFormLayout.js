import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import SelectFaculty from "../selectFaculty/SelectFaculty";
import SelectGender from "../selectGender/SelectGender";
import SelectUniversity from "../selectUniveristy/SelectUniveristy";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

function RegisterFormLayout() {
  const { t } = useTranslation(["register"]);
  const [selectedUni, setSelectedUni] = useState();
  
  return (
    <Form>
      <Row>
        <Col>
          <FloatingLabel label={t("firstName")} className="mb-2">
            <Form.Control type="input" placeholder={"Enter first name"} />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label={t("lastName")} className="mb-2">
            <Form.Control type="input" placeholder={"Enter last name"} />
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel label={t("email")} className="mb-2">
        <Form.Control type="email" placeholder={"name@example.com"} />
      </FloatingLabel>
      <FloatingLabel label={t("password")} className="mb-2">
        <Form.Control type="password" placeholder={"Password"} />
      </FloatingLabel>
      <Form.Check
        inline
        className="mb-2"
        type="switch"
        label={t("onExchange")}
      ></Form.Check>
      <SelectUniversity selectedUniversity={uni => setSelectedUni(uni)}/>
      <SelectFaculty selectedUniversity={selectedUni}/>
      <SelectGender />
      <Row className="p-3">
        <Button variant="primary" type="submit" size="md">
          {t("signUp")}
        </Button>
      </Row>
    </Form>
  );
}

export default RegisterFormLayout;
