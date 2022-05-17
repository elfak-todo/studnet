import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginForm.style.css";
import axios from "axios";
import { SERVER_ADDRESS } from "../../config";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Card,
  Form,
  FloatingLabel,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

function LoginForm() {
  const { t } = useTranslation(["login"]);

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [showWrongPassLabel, setShowWrongPassLabel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const usernameOrEmailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHander = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      const enteredUsernameOrEmail = usernameOrEmailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      axios
        .post(SERVER_ADDRESS + "Student/Login", {
          username: enteredUsernameOrEmail,
          password: enteredPassword,
        })
        .then(function (response) {
          navigate("/home", { replace: true });
          localStorage.setItem("student", JSON.stringify(response.data));
          setIsLoading(false);
          setShowWrongPassLabel(false);
        })
        .catch(function (error) {
          if (error.response.data === "BadCredentials") {
            setIsLoading(false);
            setShowWrongPassLabel(true);
          }
        });
    } else {
      event.stopPropagation();
      setIsLoading(false);
    }
    setValidated(true);
  };

  return (
    <Card className="m-3 shadow p-3">
      <Card.Header>
        <Card.Title className="text-center">{t("login")}</Card.Title>
        <Card.Text className="text-center">{t("loginToYourAccount")}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={submitHander}>
          <FloatingLabel label={t("email")}>
            <Form.Control
              required
              className="mb-3 prevent-validation-color"
              type="text"
              placeholder={"Email or Username"}
              ref={usernameOrEmailInputRef}
              onChange={() => {
                setShowWrongPassLabel(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterEmail")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label={t("password")}>
            <Form.Control
              required
              className="prevent-validation-color"
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
              onChange={() => {
                setShowWrongPassLabel(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterPassword")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Row className="p-3">
            {showWrongPassLabel && (
              <Alert variant="danger" className="text-center">
                {t("noMatch")}
              </Alert>
            )}
            <Button
              variant="primary"
              type="submit"
              size="md"
              className="mt-2"
              onClick={() => {
                setIsLoading(true);
              }}
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
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
