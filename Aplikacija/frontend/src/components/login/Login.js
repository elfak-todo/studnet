import React from "react";
import LoginDescription from "../loginDescription/LoginDescription";
import LoginForm from "../loginForm/LoginForm";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import "./Login.style.css";

function Login() {
  return (
    <div className="login">
      <LoginDescription />
      <LoginForm />
      <div className="mx-auto my-3">
        <SelectLanguage style={{ textColor: "white" }} onNavbar={false}/>
      </div>
    </div>
  );
}

export default Login;
