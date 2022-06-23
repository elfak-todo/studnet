import axios from "axios";
import SelectFaculty from "../selectFaculty/SelectFaculty";
import SelectGender from "../selectGender/SelectGender";
import SelectUniversity from "../selectUniveristy/SelectUniveristy";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";

function RegisterFormLayout() {
  const { t } = useTranslation(["register"]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [lastNameInvalid, setlastNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordShortInvalid, setPasswordShortInvalid] = useState(false);
  const [universityInvalid, setUniversityInvalid] = useState(false);
  const [facultyInvalid, setFacultyInvalid] = useState(false);
  const [genderInvalid, setGenderInvalid] = useState(false);

  const [selectedUni, setSelectedUni] = useState();
  const [selectedFac, setSelectedFac] = useState();
  const [selectedGend, setSelectedGend] = useState();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const onExchangeInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const selectedUniversity = selectedUni;
    const selectedFaculty = selectedFac;
    const selectedGender = selectedGend;
    const onExchange = onExchangeInputRef.current.checked;

    let proceed = true;

    if (enteredFirstName === "" || enteredFirstName.lentgh > 32) {
      setFirstNameInvalid(true);
      proceed = false;
    }

    if (enteredLastName === "" || enteredLastName.length > 32) {
      setlastNameInvalid(true);
      proceed = false;
    }
    if (enteredEmail === "" || enteredEmail.length > 64) {
      setEmailInvalid(true);
      proceed = false;
    } else {
      const validRegex = /^([a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}/;

      if (!validRegex.test(enteredEmail)) {
        setEmailInvalid(true);
        proceed = false;
      }
    }

    if (enteredUsername === "" || enteredUsername.length > 32) {
      setUsernameInvalid(true);
      proceed = false;
    }

    if (enteredPassword === "" || enteredPassword.length > 128) {
      setPasswordInvalid(true);
      proceed = false;
    } else if (enteredPassword.length < 6) {
      setPasswordShortInvalid(true);
      setPasswordInvalid(true);
      proceed = false;
    }

    if (selectedUniversity === undefined || selectedUniversity === "0") {
      setUniversityInvalid(true);
      proceed = false;
    }

    if (selectedFaculty === undefined || selectedFaculty === "0") {
      setFacultyInvalid(true);
      proceed = false;
    }

    if (selectedGender === undefined) {
      setGenderInvalid(true);
      proceed = false;
    }

    if (proceed) {
      axios
        .post("Student/Register", {
          username: enteredUsername,
          password: enteredPassword,
          email: enteredEmail,
          firstName: enteredFirstName,
          lastName: enteredLastName,
          gender: selectedGender,
          isExchange: onExchange,
          universityId: selectedUniversity,
          parlamentId: selectedFaculty,
        })
        .then(function (response) {
          setIsLoading(false);
          if (response.data === "RegistrationSuccessful") {
            navigate("/", { replace: true });
          }
        })
        .catch(function (error) {
          setIsLoading(false);
          if (error.response.data === "EmailTaken") {
            setEmailInvalid(true);
            setEmailTaken(true);
          }
          if (error.response.data === "UsernameTaken") {
            setUsernameInvalid(true);
            setUsernameTaken(true);
          }
        });
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Form noValidate onSubmit={submitHandler}>
      <Row>
        <Col>
          <FloatingLabel label={t("firstName")} className="mb-2">
            <Form.Control
              type="input"
              placeholder={"Enter first name"}
              isInvalid={firstNameInvalid}
              ref={firstNameInputRef}
              onChange={() => {
                setFirstNameInvalid(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterFirstName")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label={t("lastName")} className="mb-2">
            <Form.Control
              type="input"
              placeholder={"Enter last name"}
              isInvalid={lastNameInvalid}
              ref={lastNameInputRef}
              onChange={() => {
                setlastNameInvalid(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterLastName")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel label={t("email")} className="mb-2">
        <Form.Control
          type="email"
          placeholder={"name@example.com"}
          isInvalid={emailInvalid}
          ref={emailInputRef}
          onChange={() => {
            setEmailInvalid(false);
            setEmailTaken(false);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {emailTaken ? t("emailTaken") : t("enterEmail")}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t("username")} className="mb-2">
        <Form.Control
          type="text"
          placeholder={"Username"}
          isInvalid={usernameInvalid}
          ref={usernameInputRef}
          onChange={() => {
            setUsernameInvalid(false);
            setUsernameTaken(false);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {usernameTaken ? t("usernameTaken") : t("enterUsername")}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t("password")} className="mb-2">
        <Form.Control
          type="password"
          placeholder={"Password"}
          isInvalid={passwordInvalid}
          ref={passwordInputRef}
          onChange={() => {
            setPasswordInvalid(false);
            setPasswordShortInvalid(false);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {passwordShortInvalid ? t("passwordLength") : t("enterPassword")}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Form.Check
        inline
        className="mb-2"
        type="switch"
        label={t("onExchange")}
        ref={onExchangeInputRef}
      ></Form.Check>
      <SelectUniversity
        selectedUni={selectedUni}
        setSelectedUni={setSelectedUni}
        invalid={universityInvalid}
        setInvalid={setUniversityInvalid}
      />
      <SelectFaculty
        selectedUni={selectedUni}
        selectedFac={selectedFac}
        setSelectedFac={setSelectedFac}
        invalid={facultyInvalid}
        setInvalid={setFacultyInvalid}
      />
      <SelectGender
        selectedGender={(value) => setSelectedGend(value)}
        invalid={genderInvalid}
        setInvalid={(value) => setGenderInvalid(value)}
      />
      <Row className="p-3">
        <Button
          variant="primary"
          type="submit"
          size="md"
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
          {t("signUp")}
        </Button>
      </Row>
    </Form>
  );
}

export default RegisterFormLayout;
