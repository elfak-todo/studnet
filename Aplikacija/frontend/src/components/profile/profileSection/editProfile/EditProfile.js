import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FloatingLabel,
  Image,
  Spinner,
} from "react-bootstrap";

import defaultPic from "../../../../images/defaultProfilePic.jpg";
import SelectUniversity from "../../../selectUniveristy/SelectUniveristy";
import SelectFaculty from "../../../selectFaculty/SelectFaculty";
import SelectGender from "../../../selectGender/SelectGender";
import "./EditProfile.style.css";

function EditProfile({student, ...props}) {
  const { t } = useTranslation(["profile", "register", "misc"]);

  const [isLoading, setIsLoading] = useState(false);

  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [lastNameInvalid, setlastNameInvalid] = useState(false);
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
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const onExchangeInputRef = useRef();

  const submitHandler = (e) => {
    // TODO
    e.preventDefault();
    console.log(selectedFac, selectedGend);
  };

  return (
    <Modal {...props} size="md" centered backdrop="static">
      <Modal.Header closeButton style={{backgroundColor: "#4e54c8"}}>
        <Modal.Title style={{color: "white"}} >{t("editProfile")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={submitHandler}>
          <div className="add-image-div">
            <Image
              fluid
              src={student?.imagePath === "/" ? defaultPic : student?.imagePath}
              alt="profile-pic"
              className="edit-profile-img"
              roundedCircle
            ></Image>
            <div>
              <Form.Control type="file" size="sm" />
            </div>
          </div>
          <hr />
          <Row>
            <Col>
              <FloatingLabel label={t("register:firstName")} className="mb-2">
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
              <FloatingLabel label={t("register:lastName")} className="mb-2">
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
          <FloatingLabel label={t("register:username")} className="mb-2">
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
              {usernameTaken ? t("register:usernameTaken") : t("enterUsername")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label={t("register:password")} className="mb-2">
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
              {passwordShortInvalid
                ? t("register:passwordLength")
                : t("enterPassword")}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Form.Check
            inline
            className="mb-2"
            type="switch"
            label={t("register:onExchange")}
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
          <div className="center-button">
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
              {t("misc:saveChanges")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfile;
