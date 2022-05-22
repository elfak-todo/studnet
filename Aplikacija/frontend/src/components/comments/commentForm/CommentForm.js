import "bootstrap/dist/css/bootstrap.min.css";
import "./CommentForm.style.css";
import { useTranslation } from "react-i18next";
import { Container, Form, FormControl } from "react-bootstrap";

function CommentForm() {
  const { t } = useTranslation(["post"]);

  return (
    <Container className="mb-3 mt-3">
      <Form className="comment-form">
        <FormControl
          as="textarea"
          type="search"
          placeholder={t("commentSome")}
          className="me-2"
        />
      </Form>
    </Container>
  );
}

export default CommentForm;
