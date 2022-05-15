import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginForm.style.css";
import { SERVER_ADDRESS } from "../../config";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Form, FloatingLabel, Button, Alert } from "react-bootstrap";

function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation(["login"]);
  const [validated, setValidated] = useState(false);
  const [showWrongPassLabel, setShowWrongPassLabel] = useState(true);

  const usernameOrEmailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHander = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      const enteredUsernameOrEmail = usernameOrEmailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      fetch(SERVER_ADDRESS + "Student/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: enteredUsernameOrEmail,
          password: enteredPassword,
        }),
      }).then((response) => {
        if (response.ok) {
          navigate("/home", { replace: true });
          setShowWrongPassLabel(true);

          response.json().then((data) => {

            //Luka hir, iz dis ok? xD
            //Username and role not stored.
            localStorage.setItem("token", data.accessToken);
          });
        } else if (response.status === 401) {
          setShowWrongPassLabel(false);
        }
      });
    } else {
      event.stopPropagation();
    }

    setValidated(true);
  };

  function hideWrongPassLabel() {
    setShowWrongPassLabel(true);
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
            <Form.Control
              className="prevent-validation-color"
              onClick={hideWrongPassLabel}
              required
              type="text"
              placeholder={"text"}
              ref={usernameOrEmailInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterEmail")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label={t("password")}>
            <Form.Control
              className="prevent-validation-color"
              onClick={hideWrongPassLabel}
              required
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterPassword")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Row className="p-3">
            <Alert
              variant="danger"
              className="text-center"
              hidden={showWrongPassLabel}
            >
              {t("noMatch")}
            </Alert>
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
