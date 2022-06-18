import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./MyReservation.style.css";

function MyReservation() {
  return (
    <Alert show={true} variant="primary" transition className="m-2">
      <Alert.Heading>
        My reservation
        <FontAwesomeIcon icon={faPen} className="float-end edit-icon" />
      </Alert.Heading>
      You have reserved 5 tickets for this event.
      <hr />
      <div className="d-flex justify-content-center">
        <Button variant="outline-primary"> Cancel reservation </Button>
      </div>
    </Alert>
  );
}

export default MyReservation;
