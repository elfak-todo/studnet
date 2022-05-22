import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Dropdown, Row } from "react-bootstrap";
import Post from "../post/Post";
import SelectFaculty from "../selectFaculty/SelectFaculty";
import "./Feed.style.css"

function Feed() {
  const uniNis = 1;
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
