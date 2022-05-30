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
        const f = [...feed, ...res.data];
        
        const newFeed = Array.from(new Set(f.map((p) => p.post.id))).map(
          (id) => {
            return f.find((p) => p.post.id === id);
          }
        );

        setFeed(newFeed);
      }

      setHasMore(res.data.length > 0);
      setLoading(false);
    });

    //Ne znam drugi nacin da sklonim ovaj warning ako znas Luka, skloni...
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
