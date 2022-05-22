import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";
import Post from "../post/Post";
import "./Feed.style.css";

function Feed() {
  return (
    <Container className="feed">
      <Card>
        <Card.Body>
          <Post />
          <Post />
          <Post />
          <Post />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Feed;
