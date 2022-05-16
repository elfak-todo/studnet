import "bootstrap/dist/css/bootstrap.min.css";
import SelectFaculty from "../selectFaculty/SelectFaculty";
import SelectGender from "../selectGender/SelectGender";
import SelectUniversity from "../selectUniveristy/SelectUniveristy";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

function RegisterFormLayout() {
  const { t } = useTranslation(["register"]);

  const [selectedUni, setSelectedUni] = useState();
  const [selectedFac, setSelectedFac] = useState();
  const [selectedGend, setSelectedGend] = useState();
  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [lastNameInvalid, setlastNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordShortInvalid, setPasswordShortInvalid] = useState(false);
  const [universityInvalid, setUniversityInvalid] = useState(false);
  const [facultyInvalid, setFacultyInvalid] = useState(false);
  const [genderInvalid, setGenderInvalid] = useState(false);

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
    const onExchange = onExchangeInputRef.current.value;

    let proceed = true;

    if (enteredFirstName === "") {
      setFirstNameInvalid(true);
      proceed = false;
    }

    if (enteredLastName === "") {
      setlastNameInvalid(true);
      proceed = false;
    }

    if (enteredEmail === "") {
      setEmailInvalid(true);
      proceed = false;
    }

    if (enteredUsername === "") {
      setUsernameInvalid(true);
      proceed = false;
    }

    if (enteredPassword === "") {
      setPasswordInvalid(true);
      proceed = false;
    } else if (enteredPassword.length < 8) {
      setPasswordShortInvalid(true);
      setPasswordInvalid(true);
      proceed = false;
    }

    if (
      selectedUniversity === undefined ||
      selectedUniversity === null ||
      selectedUniversity === t("chooseUni")
    ) {
      setUniversityInvalid(true);
      proceed = false;
    }

    if (
      selectedFaculty === undefined ||
      selectedFaculty === null ||
      selectedFaculty === t("chooseFac")
    ) {
      setFacultyInvalid(true);
      proceed = false;
    }

    if (selectedGender === undefined || selectedGend === null) {
      setGenderInvalid(true);
      proceed = false;
    }

    if (proceed) {
      //Post data
      const data = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        username: enteredUsername,
        password: enteredPassword,
        onExchange: onExchange,
        university: selectedUniversity,
        faculty: selectedFaculty,
        gender: selectedGender,
      };
      console.log(data);
    }
  };
  return (
    <Form noValidate onSubmit={submitHandler}>
      <Row>
        <Col>
          <FloatingLabel label={t("firstName")} className="mb-2">
            <Form.Control
              isInvalid={firstNameInvalid}
              onChange={() => {
                setFirstNameInvalid(false);
              }}
              type="input"
              placeholder={"Enter first name"}
              ref={firstNameInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterFirstName")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label={t("lastName")} className="mb-2">
            <Form.Control
              isInvalid={lastNameInvalid}
              onChange={() => {
                setlastNameInvalid(false);
              }}
              type="input"
              placeholder={"Enter last name"}
              ref={lastNameInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t("enterLastName")}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel label={t("email")} className="mb-2">
        <Form.Control
          isInvalid={emailInvalid}
          onChange={() => {
            setEmailInvalid(false);
          }}
          type="email"
          placeholder={"name@example.com"}
          ref={emailInputRef}
        />
        <Form.Control.Feedback type="invalid">
          {t("enterEmail")}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t("username")} className="mb-2">
        <Form.Control
          isInvalid={usernameInvalid}
          onChange={() => {
            setUsernameInvalid(false);
          }}
          type="text"
          placeholder={"Username"}
          ref={usernameInputRef}
        />
        <Form.Control.Feedback type="invalid">
          {t("enterUsername")}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t("password")} className="mb-2">
        <Form.Control
          isInvalid={passwordInvalid}
          onChange={() => {
            setPasswordInvalid(false);
            setPasswordShortInvalid(false);
          }}
          type="password"
          placeholder={"Password"}
          ref={passwordInputRef}
        />
        {passwordShortInvalid ? (
          <Form.Control.Feedback type="invalid">
            {t("passwordLength")}
          </Form.Control.Feedback>
        ) : (
          <Form.Control.Feedback type="invalid">
            {t("enterPassword")}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>
      <Form.Check
        inline
        className="mb-2"
        type="switch"
        label={t("onExchange")}
        ref={onExchangeInputRef}
      ></Form.Check>
      <SelectUniversity
        selectedUniversity={(value) => setSelectedUni(value)}
        invalid={universityInvalid}
        setInvalid={(value) => setUniversityInvalid(value)}
      />
      <SelectFaculty
        selectedUniversity={selectedUni}
        selectedFaculty={(fac) => setSelectedFac(fac)}
        invalid={facultyInvalid}
        setInvalid={(value) => setFacultyInvalid(value)}
      />
      <SelectGender
        selectedGender={(value) => setSelectedGend(value)}
        invalid={genderInvalid}
        setInvalid={(value) => setGenderInvalid(value)}
      />
      <Row className="p-3">
        <Button variant="primary" type="submit" size="md">
          {t("signUp")}
        </Button>
      </Row>
    </Form>
  );
}

export default RegisterFormLayout;
