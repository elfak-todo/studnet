import "bootstrap/dist/css/bootstrap.min.css";
import "./Feed.style.css";
import axios from "axios";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
let page = 0;

function Feed() {
  const [feed, setFeed] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadMorePosts = (pg) => {
    setIsLoaded(false);

    axios.get("Post/Feed/" + pg).then((res) => {
      const newPosts = res.data;
      if (newPosts !== null && newPosts !== undefined && newPosts.length > 0) {
        pg === 0
          ? setFeed(newPosts)
          : setFeed((oldPosts) => [...oldPosts, ...newPosts]);
      }
      setIsLoaded(true);
    });
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 15 >=
      e.target.documentElement.scrollHeight
    ) {
      loadMorePosts((page += 1));
    }
  };

  useEffect(() => {
    loadMorePosts(0);
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          {feed.map((p) => (
            <Post
              key={p.post.id}
              author={p.author}
              comments={p.comments}
              post={p.post}
            />
          ))}
          {!isLoaded && (
            <div className="feed-spinner">
              <Spinner
                className="text-center"
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
              />
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Feed;
