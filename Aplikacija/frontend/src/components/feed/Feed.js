import "bootstrap/dist/css/bootstrap.min.css";
import "./Feed.style.css";
import axios from "axios";
import Post from "../post/Post";
import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Card, Spinner } from "react-bootstrap";

function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get("Post/Feed/" + pageNum).then((res) => {
      pageNum === 0
        ? setFeed(res.data)
        : setFeed((oldPosts) => [...oldPosts, ...res.data]);
      setHasMore(res.data.length > 0);
      setLoading(false);
    });
  }, [pageNum]);

  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container fluid className="feed">
      <Card className="feed-card">
        {feed.map((p, i) => {
          if (feed.length === i + 1) {
            return (
              <Post
                key={p.post.id}
                author={p.author}
                comments={p.comments}
                post={p.post}
                innerRef={lastPost}
              />
            );
          } else {
            return (
              <Post
                key={p.post.id}
                author={p.author}
                comments={p.comments}
                post={p.post}
              />
            );
          }
        })}
        {loading && (
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
      </Card>
    </Container>
  );
}

export default Feed;
