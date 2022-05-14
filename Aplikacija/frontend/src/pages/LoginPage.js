import LoginDescription from "../components/loginDescription/LoginDescription";
import LoginForm from "../components/loginForm/LoginForm";
import SelectLanguage from "../components/selectLanguage/SelectLanguage";
import { Container, Row, Col } from "react-bootstrap";

function LoginPage() {
  return (
    <Container fluid>
      <SelectLanguage />
      <Row>
        <Col lg={6} md={5} sm={12}>
          <LoginDescription />
        </Col>
        <Col lg={4} md={5} sm={12} className="p-5">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}
export default LoginPage;
