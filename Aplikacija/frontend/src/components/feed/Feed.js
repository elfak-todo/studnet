import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Card, Spinner } from "react-bootstrap";

import Post from "../post/Post";
import PostForm from "../post/postForm/PostForm";

import "./Feed.style.css";

function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get("Post/Feed/" + pageNum).then((res) => {
      if (pageNum === 0) {
        setFeed(res.data);
      } else {
        setFeed((state) => {
          const f = [...state, ...res.data];

          return Array.from(new Set(f.map((p) => p.post.id))).map((id) => {
            return f.find((p) => p.post.id === id);
          });
        });
      }

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
    <Container fluid>
      <PostForm feed={feed} setFeed={setFeed} />
      <Card className="feed-card">
        {feed.map((p, i) => {
          if (feed.length === i + 1) {
            return (
              <Post
                key={p.post.id}
                author={p.author}
                comments={p.comments}
                post={p.post}
                liked={p.liked}
                innerRef={lastPost}
                feed={feed}
                setFeed={setFeed}
              />
            );
          } else {
            return (
              <Post
                key={p.post.id}
                author={p.author}
                comments={p.comments}
                post={p.post}
                liked={p.liked}
                feed={feed}
                setFeed={setFeed}
              />
            );
          }
        })}
        {loading && (
          <div className="comments-spinner">
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
