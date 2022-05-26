import "bootstrap/dist/css/bootstrap.min.css";
import "./Post.style.css";
import PostHeader from "./postHeader/PostHeader";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "../comments/commentSection/CommentSection";
import { Card, Container } from "react-bootstrap";

function Post({ author, comments, post, innerRef}) {
  return (
    <Container className="mb-5" ref={innerRef}>
      <Card className="post shadow rounded">
        <PostHeader author={author} post={post} />
        <Card.Body>
          <Card.Text>{post.text}</Card.Text>
          <PostFooter counters={post} />
          <CommentSection author={author} comments={comments} post={post} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Post;
