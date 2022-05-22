import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";

function Feed() {
  const [feed, setFeed] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get("Post/Feed/0").then((res) => {
      setFeed(res.data);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <div> Loading... </div>;
  }

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          {feed !== null
            ? feed.map((p) => (
                <Post
                  key={p.post.id}
                  author={p.author}
                  comments={p.comments}
                  post={p.post}
                />
              ))
            : null}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Feed;
