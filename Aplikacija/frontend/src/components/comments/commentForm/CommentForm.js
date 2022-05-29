import axios from "axios";
import { useTranslation } from "react-i18next";
import { Container, Form, FormControl } from "react-bootstrap";
import { useRef } from "react";

import "./CommentForm.style.css";

function CommentForm({ post, comments, setComments, feed, setFeed }) {
  const { t } = useTranslation(["post"]);

  const commentInputRef = useRef();

  const submitHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const commentText = commentInputRef.current.value;
      if (commentText === "") return;

      commentInputRef.current.value = "";

      axios
        .post("Comment/Post/" + post.id, {
          text: commentText,
        })
        .then((res) => {
          setComments([...comments, res.data]);
          commentCounterInc();
        });
    }
  };

  const commentCounterInc = () => {
    let feedCopy = [];

    feed.forEach((p) => {
      if (p.post.id === post.id) {
        let postCopy = p;
        postCopy.post.commentCount = postCopy.post.commentCount + 1;
        feedCopy.push(postCopy);
      } else feedCopy.push(p);
    });

    setFeed(feedCopy);
  };

  return (
    <Container className="mb-2 mt-2">
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
