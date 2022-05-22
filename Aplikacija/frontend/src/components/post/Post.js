import "bootstrap/dist/css/bootstrap.min.css";
import "./Post.style.css";
import PostHeader from "./postHeader/PostHeader";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "../comments/commentSection/CommentSection";
import { Card, Container } from "react-bootstrap";

function Post() {
  return (
    <Container className="mb-5">
      <Card className="post shadow bg-white rounded">
        <PostHeader />
        <Card.Body>
          <Card.Text>
            Jučerašnji dan je bio jako produktivan! Uspeo sam da završim student
            manager-a kao i dosta drugih stvari koje su moje kolege propustile!
            Današnji plan je da odmaram! Zasluženo!
          </Card.Text>
          <PostFooter />
          <CommentSection />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Post;
