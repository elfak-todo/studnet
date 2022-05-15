import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterForm.style.css";
import { useTranslation } from "react-i18next";
import RegisterFormLayout from "../registerFormLayout/RegisterFormLayout";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegisterForm() {
  const { t } = useTranslation(["register", "login"]);

  return (
    <div className="registration-from">
      <Card className="m-2 shadow p-3">
        <Card.Header>
          <Card.Title className="text-center"> {t("createAcc")}</Card.Title>
          <Card.Text className="text-center"> {t("subtitle")}</Card.Text>
        </Card.Header>
        <Card.Body>
          <RegisterFormLayout />
          <Card.Footer>
            <Card.Text>
              {t("haveAcc?")}
              <Link to="/"> {t("login:signIn")} </Link>
            </Card.Text>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterForm;
