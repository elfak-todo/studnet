import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useRef, useState } from "react";
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
    const verified = !anonymous ? verifiedRef.current.checked : false;
    const pinned = !anonymous ? pinnedRef.current.checked : false;

    setLoading(true);

    axios
      .post("Post", {
        anonymous: anonymousPost,
        verified: verified,
        pinned: pinned,
        text: postText,
      })
      .then((response) => {
        console.log(response.data);

        //TODO luka treba da izmeni back

        // let postId = 0;
        // if (verified && pinned) {
        //   feed.unshift(response.data);
        //   setFeed(feed);
        // } else if (pinned && !verified) {
        //   feed.forEach((p) => {
        //     if (p.post.pinned) postId = p.id;
        //   });
        //   feed.splice(postId, 0, response.data);
        //   setFeed(feed);
        // } else {
        //   feed.forEach((p) => {
        //     if (p.post.verified) postId = p.id;
        //   });
        //   feed.splice(postId, 0, response.data);
        //   setFeed(feed);
        // }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };

  const handleAnonymous = () => {
    if (anonymousRef.current.checked) setAnonymous(true);
    else setAnonymous(false);
  };

  return (
    <Container className="post-form-container">
      <Card>
        <Card.Body>
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
            {anonymous ? t("anonymous") : student.name}
            <Form.Check
              id="sw"
              type="switch"
              label={t("anonymousPost")}
              onChange={handleAnonymous}
              ref={anonymousRef}
            />
          </div>
          <Form noValidate onSubmit={submitHandler}>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              placeholder={t("postSome")}
              ref={postTextInputRef}
            ></Form.Control>
            <div className="post-toolbar">
              {!anonymous && student.role !== 0 && (
                <Form.Check
                  type="checkbox"
                  label={t("verified")}
                  ref={verifiedRef}
                  inline
                />
              )}
              {!anonymous && student.role !== 0 && (
                <Form.Check
                  type="checkbox"
                  label={t("pinned")}
                  ref={pinnedRef}
                  inline
                />
              )}
            </div>
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
