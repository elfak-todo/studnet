import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Container, Card, Form, Button, Image, Spinner } from "react-bootstrap";

import StudentContext from "../../studentManager/StudentManager";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import anonymousPic from "../../../images/anonymous.jpg";
import "./PostForm.style.css";

function PostForm({ feed, setFeed }) {
  const { t } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const anonymousRef = useRef();
  const postTextInputRef = useRef();
  const verifiedRef = useRef();
  const pinnedRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    if (postTextInputRef.current.value === "") return;

    const anonymousPost = anonymousRef.current.checked;
    const postText = postTextInputRef.current.value;
    const verified =
      !anonymousPost && student.role !== 0
        ? verifiedRef.current.checked
        : false;
    const pinned =
      !anonymousPost && student.role !== 0 ? pinnedRef.current.checked : false;

    postTextInputRef.current.value = "";

    if (!anonymousPost && student.role !== 0) {
      verifiedRef.current.checked = false;
      pinnedRef.current.checked = false;
    }

    setLoading(true);

    axios
      .post("Post", {
        anonymous: anonymousPost,
        verified: verified,
        pinned: pinned,
        text: postText,
      })
      .then((response) => {
        setFeed([response.data, ...feed]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const handleAnonymous = () => {
    if (anonymousRef.current.checked) setAnonymous(true);
    else setAnonymous(false);
  };

  return (
    <Container className="post-form-container">
      <Card className="shadow-sm post-form-card" border="primary">
        <Card.Header>
          <div className="post-form-header">
            <Image
              src={
                anonymous
                  ? anonymousPic
                  : student.imagePath === "/"
                  ? defaultPic
                  : student.imagePath
              }
              alt="user-pic"
              className="m-2 profile-pic"
              roundedCircle
            />
            {anonymous
              ? t("anonymous")
              : student.firstName + " " + student.lastName}
            <Form.Check
              id="sw"
              type="switch"
              label={t("anonymousPost")}
              onChange={handleAnonymous}
              ref={anonymousRef}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={submitHandler}>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              rows={5}
              type="text"
              placeholder={t("postSome")}
              ref={postTextInputRef}
            ></Form.Control>
            {student.role > 0 && (
              <div className="post-toolbar mt-1">
                <Form.Check
                  className="form-checks"
                  disabled={anonymous}
                  type="checkbox"
                  label={
                    <>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#5cb85c" }}
                        className="me-1"
                      />
                      {t("verified")}
                    </>
                  }
                  ref={verifiedRef}
                  inline
                />
                <Form.Check
                  className="form-checks"
                  disabled={anonymous}
                  type="checkbox"
                  label={
                    <>
                      <FontAwesomeIcon
                        icon={faThumbTack}
                        style={{ color: "#4e54c8" }}
                        className="me-1"
                      />
                      {t("pinned")}
                    </>
                  }
                  ref={pinnedRef}
                  inline
                />
              </div>
            )}
            <div className="post-toolbar">
              <Button
                variant="primary"
                type="submit"
                className="mt-2 text-center"
              >
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {t("post")}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostForm;
