import RegisterForm from "../components/registerForm/RegisterForm";
import SelectLanguage from "../components/selectLanguage/SelectLanguage";
import { Container } from "react-bootstrap";

function RegisterPage() {
  return (
    <Container fluid>
      <SelectLanguage />
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
