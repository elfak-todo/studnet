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
      <Card>
        <Card.Body>
          <Card.Title className="text-center"> {t("createAcc")}</Card.Title>
          <Card.Text className="text-center"> {t("subtitle")}</Card.Text>
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
