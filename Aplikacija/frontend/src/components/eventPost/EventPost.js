import "bootstrap/dist/css/bootstrap.min.css";
import "./EventPost.style.css";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
import EventPostFooter from "./eventPostFooter/EventPostFooter";
import { Card, Container } from "react-bootstrap";

function EventPost({ author, comments, post, innerRef})
{
    return(
        <Container className="mb-6" ref={innerRef}>
            <Card className="post shadow rounded">
                <EventPostHeader author={author} post={post}/>
                <Card.Body>
                    <Card.Text>{post.text}</Card.Text>
                    <EventPostFooter counters={post} />
                    <CommentSection author={author} comments={comments} post={post} />
                </Card.Body>
            </Card> 
        </Container>
    );
}

export default EventPost;