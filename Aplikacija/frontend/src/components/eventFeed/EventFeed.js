import "bootstrap/dist/css/bootstrap.min.css";
// import "./Feed.style.css";
// import axios from "axios";
// import Post from "../post/Post";
// import { useEffect, useState, useRef, useCallback } from "react";
 import { Container} from "react-bootstrap";

function eventFeed({author, comments, event})
{
    return (
        <Container>
            {/* <Card>
                <EventHeader>
                <Card.Body>
                    <Card.Text> </Card.Text>
                    <PostFooter />
                    <CommentSection author={author} comments={comments} event={event} />
                </Card.Body>
                </EventHeader>
            </Card> */}
        </Container>
    );
}

export default eventFeed