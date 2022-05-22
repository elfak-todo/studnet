import "bootstrap/dist/css/bootstrap.min.css";
import "./Post.style.css";
import PostHeader from "./postHeader/PostHeader";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "../comments/commentSection/CommentSection";
import { Card, Container } from "react-bootstrap";

function Post({ author, comments, post }) {
  return (
    <Container className="mb-5">
      <Card className="post shadow bg-white rounded">
        <PostHeader author={author}/>
        <Card.Body>
          <Card.Text>{post.text}</Card.Text>
          <PostFooter counters={post} />
          <CommentSection author={author} comments={comments} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Post;
