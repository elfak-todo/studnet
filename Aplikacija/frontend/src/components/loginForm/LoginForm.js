import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Form, FloatingLabel, Button, Alert } from "react-bootstrap";

function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation(["login"]);
  const [validated, setValidated] = useState(false);
  const [showWrongPassLabel, setShowWrongPassLabel] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHander = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      fetch("https://localhost:7246/Student/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword,
        }),
      })
        .then((response) => {
          switch (response.status) {
            case 200:
              navigate("/home", { replace: true });
              setShowWrongPassLabel(true);
              break;
            case 401:
              setShowWrongPassLabel(false);
              break;
            default:
              break;
          }
        })
        .then((data) => console.log(data));
    } else {
      event.stopPropagation();
    }

    setValidated(true);
  };

  function hideWrongPassLabel(){
    setShowWrongPassLabel(true)
  }

  return (
    <Card className="m-3 shadow p-3">
      <Card.Header>
        <Card.Title className="text-center">{t("login")}</Card.Title>
        <Card.Text className="text-center">{t("loginToYourAccount")}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={submitHander}>
          <FloatingLabel label={t("email")} className="mb-3">
            <Form.Control onClick={hideWrongPassLabel}
              required
              type="email"
              placeholder={"name@example.com"}
              ref={emailInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterEmail")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label={t("password")}>
            <Form.Control onClick={hideWrongPassLabel}
              required
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterPassword")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Form.Check
            className="mt-3"
            type="switch"
            label={t("stayLoggedIn")}
          />
          <Row className="p-3">
            <Alert variant="danger" className="text-center" hidden={showWrongPassLabel}>{t("noMatch")}</Alert>
            <Button variant="primary" type="submit" size="md" className="mt-2">
              {t("signIn")}
            </Button>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          {t("dontHaveAcc")}
          <Link to="/register">{t("signUp")}</Link>
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default LoginForm;
