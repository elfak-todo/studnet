import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useRef } from "react";
import { Container, Form, FormControl, Image } from "react-bootstrap";

import "./CommentForm.style.css";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import StudentContext from "../../studentManager/StudentManager";

function CommentForm({
  postType,
  post,
  comments,
  setComments,
  setNoComments,
  setFeed,
}) {
  const { t } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const commentInputRef = useRef();

  const submitHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const commentText = commentInputRef.current.value;

      if (commentText === "") return;

      commentInputRef.current.value = "";

      const postComment = {
        text: commentText,
        commentedPostId: post.id,
      };

      const eventComment = {
        text: commentText,
        commentedEventId: post.id,
      };

      let comm = null;
      if (postType === "post") comm = postComment;
      else if (postType === "event") comm = eventComment;

      axios
        .post("Comment/Post/", comm)
        .then((res) => {
          setComments([...comments, res.data]);
          setNoComments(false);
          setFeed((prevState) => {
            return prevState.map((p) => {
              if (p.id === post.id) {
                if (postType === "event")
                  p.ev.commentCount = p.ev.commentCount + 1;
                else p.post.commentCount = p.post.commentCount + 1;
                return p;
              } else return p;
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container className="mb-2 mt-2 ms-0">
      <div className="leave-comm">
        <Image
          src={student.imagePath === "/" ? defaultPic : student.imagePath}
          alt="user-pic"
          className="comment-profile-pic"
          roundedCircle
        />
        <Container>
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
      </div>
    </Container>
  );
}

export default CommentForm;
