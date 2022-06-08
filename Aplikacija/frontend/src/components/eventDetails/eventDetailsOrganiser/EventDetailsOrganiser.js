import { Card, Image } from "react-bootstrap";

import luka from "../../../images/luka.jpg";
import "./EventDetailsOrganiser.style.css";

function EventDetailsOrganiser() {
  return (
    <Card className="mt-3">
      <div className="organiser-div">
        <h4> Organiser </h4>
        <Image
          src={luka}
          alt="organiser-img"
          roundedCircle
          className="organiser-img"
        />
        <h4> Luka Kocic </h4>
        <p> Elektronski Fakultet </p>
      </div>
    </Card>
  );
}

export default EventDetailsOrganiser;
