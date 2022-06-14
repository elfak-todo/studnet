import { useTranslation } from "react-i18next";
import { Card, Container, Image } from "react-bootstrap";

import "./EventPost.style.css";
import noImage from "../../images/no-image.jpg";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
import EventPostBody from "./eventPostBody/EventPostBody";
import EventPostFooter from "./eventPostFooter/EventPostFooter";
import CommentSection from "../comments/commentSection/CommentSection";

function EventPost({ feedEl, innerRef, feed, setFeed, verified, pinned }) {
  const { t } = useTranslation(["event"]);
  return (
    <Container className="mb-3 mt-3 mx-auto px-0" ref={innerRef}>
      <Card className="shadow">
        {feedEl.ev.organisingParlamentId !== null && (
          <div className="parlament-div">
            <span className="parlament-text ms-2">{t("orgByPar")}</span>
          </div>
        )}
        <div className="event-desc">
          <div className="event-img-div">
            <Image
              src={feedEl.ev.imagePath === "" ? noImage : feedEl.ev.imagePath}
              alt="event-img"
              className="event-img"
            />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card className="ev-card-neki">
              <Card.Header>
                <EventPostHeader
                  author={feedEl.author}
                  event={feedEl.ev}
                  feed={feed}
                  setFeed={setFeed}
                  verifiedProp={verified}
                  pinnedProp={pinned}
                />
              </Card.Header>
              <Card.Body>
                <div className="ev-elements">
                  <EventPostBody event={feedEl.ev} />
                  <EventPostFooter
                    event={feedEl.ev}
                    isLiked={feedEl.liked}
                    feed={feed}
                    setFeed={setFeed}
                  />
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <Card.Footer className="p-0">
          <CommentSection
            postType="event"
            commentType="event"
            author={feedEl.author}
            topComments={[]}
            post={feedEl.ev}
            feed={feed}
            setFeed={setFeed}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default EventPost;
