import { Badge } from "react-bootstrap";
import "./EventDetailsHeader.style.css";

function EventDetailsHeader() {
  return (
    <div className="details-text">
      <div className="d-flex align-items-center">
        <h2 className="event-title"> Negujmo zurka </h2>
        <div>
        <Badge bg="party" className="ms-2 mb-1"> Party </Badge>
        </div>
      </div>
      <h4 className="m-0"> Starts at June 25, 2022, 20:00 PM</h4>
      <h4> Ends at June 26, 2022, 05:00 AM</h4>
      <h4> Location Nis</h4>
    </div>
  );
}

export default EventDetailsHeader;
