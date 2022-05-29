import "bootstrap/dist/css/bootstrap.min.css";
import "./CommentForm.style.css";
import { useTranslation } from "react-i18next";
import { Container, Form, FormControl } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";

function CommentForm({ post, comments, setComments }) {
  const { t } = useTranslation(["post"]);

  const commentInputRef = useRef();

  const submitHandler = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const commentText = commentInputRef.current.value;
      commentInputRef.current.value = "";

      console.log(commentText);

      axios
        .post("Comment/Post/" + post.id, {
          text: commentText,
        })
        .then((res) => {
          console.log([...comments, res.data]);
        });
    }
  };

  return (
    <Container className="mb-3">
      <Form className="comment-form">
        <FormControl
          onKeyDown={submitHandler}
          as="textarea"
          type="text"
          placeholder={t("commentSome")}
          className="me-2"
          ref={commentInputRef}
        />
      </Form>
    </Container>
  );
}

export default CommentForm;
