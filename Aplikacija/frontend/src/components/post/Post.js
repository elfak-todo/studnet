import { Card, Container } from "react-bootstrap";

import PostHeader from "./postHeader/PostHeader";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "../comments/commentSection/CommentSection";

import "./Post.style.css";

function Post({ author, comments, post, innerRef, feed, setFeed }) {
  return (
    <Container className="mb-5" ref={innerRef}>
      <Card className="post shadow rounded">
        <PostHeader author={author} post={post} feed={feed} setFeed={setFeed} />
        <Card.Body>
          <Card.Text> {post.text} </Card.Text>
          <PostFooter post={post} />
        </Card.Body>
        <Card.Footer className="p-0">
          <CommentSection
            author={author}
            topComments={comments}
            post={post}
            feed={feed}
            setFeed={setFeed}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Post;
