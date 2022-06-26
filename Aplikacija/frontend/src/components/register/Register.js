import React from "react";
import RegisterForm from "../registerForm/RegisterForm";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import { Container } from "react-bootstrap";

import "./Register.style.css";

function Register() {
  return (
    <Container fluid className="register">
      <RegisterForm />
      <SelectLanguage onNavbar={false}/>
    </Container>
  );
}

export default Register;
