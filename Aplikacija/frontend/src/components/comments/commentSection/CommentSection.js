import "bootstrap/dist/css/bootstrap.min.css";
import "./CommentSection.style.css";
import CommentForm from "../commentForm/CommentForm";
import Comment from "../comment/Comment";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";

function CommentSection({ comments }) {
  const { t } = useTranslation(["post"]);

  return (
    <Accordion alwaysOpen flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header> {t("seeComments")} </Accordion.Header>
        <Accordion.Body>
          <CommentForm />
          {comments !== null
            ? comments.map((c) => (
                <Comment
                  key={c.comment.id}
                  author={c.author}
                  comment={c.comment}
                />
              ))
            : null}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CommentSection;
