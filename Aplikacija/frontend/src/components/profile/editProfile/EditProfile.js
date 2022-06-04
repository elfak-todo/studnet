import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FloatingLabel,
  Spinner,
  CloseButton,
  Alert,
} from "react-bootstrap";

import SelectFaculty from "../../selectFaculty/SelectFaculty";
import SelectGender from "../../selectGender/SelectGender";
import PasswordSettings from "../passwordSettings/PasswordSettings";
import EditImage from "../editImage/EditImage.js";

import "./EditProfile.style.css";

function EditProfile({ student, setStudent, showEditCover, setShowEditCover }) {
  const { t } = useTranslation(["profile", "register", "misc"]);

  const [loading, setLoading] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [lastNameInvalid, setlastNameInvalid] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [facultyInvalid, setFacultyInvalid] = useState(false);
  const [genderInvalid, setGenderInvalid] = useState(false);

  const [selectedFac, setSelectedFac] = useState();
  const [selectedGend, setSelectedGend] = useState();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const usernameInputRef = useRef();
  const onExchangeInputRef = useRef();

  useEffect(() => {
    setSelectedFac(student?.parlamentId + "");
    setSelectedGend(student?.gender);
  }, [student]);

  const submitHandler = (e) => {
    e.preventDefault();

    let proceed = true;

    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const username = usernameInputRef.current.value;
    const facultyId = selectedFac;
    const gender = selectedGend;
    const onExchange = onExchangeInputRef.current.checked;

    if (firstName === "") {
      setFirstNameInvalid(true);
      proceed = false;
    }
    if (lastName === "") {
      setlastNameInvalid(true);
      proceed = false;
    }
    if (username === "") {
      setUsernameInvalid(true);
      proceed = false;
    }
    if (facultyId === 0) {
      setFacultyInvalid(true);
      proceed = false;
    }
    if (gender === undefined && gender === null) {
      setGenderInvalid(true);
      proceed = false;
    }
    if (proceed) {
      const editedStudent = {
        ...student,
        username: username,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        isExchange: onExchange,
        parlamentId: Number(facultyId),
      };
      console.log(student);
      console.log(editedStudent);
      if (JSON.stringify(student) === JSON.stringify(editedStudent)) {
        closeEdit();
        return;
      }

      setLoading(true);
      axios
        .put("Student", {
          editedStudent,
        })
        .then((res) => {
          console.log(res.data);
          setStudent(editedStudent);
          closeEdit();
        })
        .catch((err) => {
          switch (err.response.data) {
            case "StudentRequired":
              console.log("StudentRequired");
              break;
            case "UsernameTaken":
              console.log("UsernameTaken");
              break;
            default:
              break;
          }
        });
      setLoading(false);
    }
  };

  const closeEdit = () => {
    setShowEditCover(false);
    setFirstNameInvalid(false);
    setlastNameInvalid(false);
    setUsernameInvalid(false);
    setGenderInvalid(false);
    setFacultyInvalid(false);
    setShowMessage(false);
  };

  return (
    <Modal show={showEditCover} size="md" centered backdrop="static">
      <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
        <Modal.Title style={{ color: "white" }}>{t("editProfile")}</Modal.Title>
        <CloseButton variant="white" onClick={closeEdit} />
      </Modal.Header>
      <Modal.Body>
        <EditImage />

        <Form noValidate onSubmit={submitHandler}>
          <hr />
          <Row>
            <Col>
              <FloatingLabel label={t("register:firstName")} className="mb-2">
                <Form.Control
                  type="input"
                  placeholder={"Enter first name"}
                  isInvalid={firstNameInvalid}
                  defaultValue={student?.firstName}
                  ref={firstNameInputRef}
                  onChange={() => {
                    setFirstNameInvalid(false);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {t("register:enterFirstName")}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label={t("register:lastName")} className="mb-2">
                <Form.Control
                  type="input"
                  placeholder={"Enter last name"}
                  isInvalid={lastNameInvalid}
                  defaultValue={student?.lastName}
                  ref={lastNameInputRef}
                  onChange={() => {
                    setlastNameInvalid(false);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {t("register:enterLastName")}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel label={t("register:username")} className="mb-2">
            <Form.Control
              type="text"
              placeholder={"Username"}
              isInvalid={usernameInvalid}
              defaultValue={student?.username}
              ref={usernameInputRef}
              onChange={() => {
                setUsernameInvalid(false);
                setUsernameTaken(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {usernameTaken
                ? t("register:usernameTaken")
                : t("register:enterUsername")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="password-button">
            <Button siz="md" onClick={() => setShowPassModal(true)}>
              {t("changePass")}
            </Button>
          </div>
          <Alert
            show={showMessage}
            variant="success"
            size="sm"
            dismissible
            transition
            onClose={() => setShowMessage(false)}
            className="m-2"
          >
            {t("passSuccess")}
          </Alert>
          <Form.Check
            className="mb-2 form-switch"
            defaultChecked={student?.isExchange}
            type="switch"
            label={t("register:onExchange")}
            ref={onExchangeInputRef}
          ></Form.Check>
          <SelectFaculty
            selectedUni={student?.universityId}
            selectedFac={selectedFac}
            setSelectedFac={setSelectedFac}
            invalid={facultyInvalid}
            setInvalid={setFacultyInvalid}
          />
          <SelectGender
            selectedGender={(value) => setSelectedGend(value)}
            defaultValue={student?.gender}
            invalid={genderInvalid}
            setInvalid={(value) => setGenderInvalid(value)}
          />
          <div className="center-button">
            <Button variant="primary" type="submit" size="md">
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {t("misc:saveChanges")}
            </Button>
          </div>
        </Form>
        <PasswordSettings
          showPassModal={showPassModal}
          setShowPassModal={setShowPassModal}
          setShowMessage={setShowMessage}
        />
      </Modal.Body>
    </Modal>
  );
}

export default EditProfile;
