import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Row, Card, Form, FloatingLabel, Button } from "react-bootstrap";

function LoginForm() {
  const navigate = useNavigate();

  const { t } = useTranslation(["login"]);

  return (
    <Card className="m-3 shadow p-3">
      <Card.Body>
        <Card.Title className="text-center">{t("login")}</Card.Title>
        <Card.Text className="text-center">
          {t("loginToYourAccount")}{" "}
        </Card.Text>
        <Form>
          <FloatingLabel label={t("email")} className="mb-3">
            <Form.Control type="email" placeholder={"name@example.com"} />
          </FloatingLabel>
          <FloatingLabel label={t("password")}>
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Form.Check
            className="mt-3"
            type="switch"
            label={t("stayLoggedIn")}
          />
          <Row className="p-3">
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="primary"
              type="submit"
              size="md"
              className="mt-2"
            >
              {t("signIn")}
            </Button>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          {t("dontHaveAcc")}
          <Link to="/home">{t("signUp")}</Link>
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default LoginForm;
