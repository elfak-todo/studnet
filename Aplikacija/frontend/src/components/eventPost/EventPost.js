import { Card, Container, Image } from "react-bootstrap";

import "./EventPost.style.css";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
import EventPostBody from "./eventPostBody/EventPostBody";
import EventPostFooter from "./eventPostFooter/EventPostFooter";

function EventPost({ feedEl, innerRef }) {
  return (
    <Container className="mb-3 mt-3 mx-auto px-0" ref={innerRef}>
      <Card className="shadow">
        <div className="event-desc">
          <div className="event-img-div">
            <Image
              src={feedEl.ev.imagePath}
              alt="event-img"
              className="event-img"
            />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card className="ev-card-neki">
              <Card.Header>
                <EventPostHeader author={feedEl.author} event={feedEl.ev} />
              </Card.Header>
              <Card.Body>
                <div className="ev-elements">
                  <EventPostBody event={feedEl.ev} />
                  <EventPostFooter event={feedEl.ev} />
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Card>
    </Container>
  );
}

export default EventPost;