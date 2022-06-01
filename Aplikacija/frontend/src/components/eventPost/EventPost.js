import "bootstrap/dist/css/bootstrap.min.css";
import "./EventPost.style.css";
import EventPostHeader from "./eventPostHeader/EventPostHeader";
import EventPostFooter from "./eventPostFooter/EventPostFooter";
import CommentSection from "../comments/commentSection/CommentSection"
import { Card, Container } from "react-bootstrap";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function EventPost({ author, comments, event, innerRef})
{
    // const date = new Date(event.timeOfEvent);
    // const timeSrp = date.toLocaleTimeString("srp", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    // });
    // const timeEng = date.toLocaleTimeString("eng", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    // });
    // const dateSrp = date.toLocaleString("srp", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });
    // const dateEng = date.toLocaleString("eng", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });



    return(
        <Container className="event-post" ref={innerRef}>
            <Card className="event post shadow rounded">
                <EventPostHeader author={author} event={event}>
                    {event.verified && (
                        <FontAwesomeIcon
                            ckassName="event-header-verify"
                            icon={faCircleCheck}
                        />
                        )}
                </EventPostHeader>
                <Card.Body>
                    <Card.Img
                        variant= "top" 
                        src={event.imagePath} 
                        className="card-img" 
                    />
                        <Card.Text className="event-title">
                            {event.title}
                        </Card.Text>
                        <Card.Text>
                            <Card.Link className="event-location">
                                {event.locationName}
                            </Card.Link>
                        </Card.Text>
                    <Card.Text>{event.description}</Card.Text>
                    <EventPostFooter counters={event} />
                </Card.Body>
                <Card.Footer>
                    
                </Card.Footer>
            </Card> 
        </Container>
    );
}

export default EventPost;