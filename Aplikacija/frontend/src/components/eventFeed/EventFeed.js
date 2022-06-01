import "./EventFeed.style.css";
import axios from "axios";
import EventPost from "../eventPost/EventPost";
import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Card, Spinner } from "react-bootstrap";

function EventFeed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get("Event/Feed/" + pageNum).then((res) => {
      pageNum === 0
        ? setFeed(res.data)
        : setFeed((oldEvents) => [...oldEvents, ...res.data]);
      setHasMore(res.data.length > 0);
      setLoading(false);
    });
  }, [pageNum]);

  const lastEvent = useCallback(
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
        {feed.map((e, i) => {
          if (feed.length === i + 1) {
            return (
              <EventPost
                key={e.ev.id}
                author={e.author}
                comments={e.comments}
                event={e.ev}
                innerRef={lastEvent}
              />
            );
          } else {
            return (
              <EventPost
                key={e.ev.id}
                author={e.author}
                comments={e.comments}
                event={e.ev}
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

export default EventFeed;
