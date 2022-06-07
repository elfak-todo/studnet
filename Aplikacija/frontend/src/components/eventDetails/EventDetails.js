import { Container, Card, Image, Badge } from "react-bootstrap";

import elektrijada from "../../images/events/elektrijada.jpg";
import "./EventDetails.style.css";

function EventDetails() {
  return (
    <Container>
      <Card className="ev-desc-card">
        <div className="d-flex">
          <div className="d-flex justify-content-center">
            <Image src={elektrijada} alt="event-img" thumbnail />
          </div>
          <Container className="m-0 p-0" fluid>
            <Card>
              <Card.Body>
                <div className="desc-div-ev">
                  <div className="d-flex align-items-center">
                    <Card.Text className="desc-title-ev">Elektrijada</Card.Text>
                    <div>
                      <Badge bg="party" className="ms-2 p-2">
                        Party
                      </Badge>
                    </div>
                  </div>

                  <Card.Text className="m-0 p-0">
                    Starts at June 25, 2022, 04:17 PM{" "}
                  </Card.Text>
                  <Card.Text className="m-0 p-0">
                    Ends at June 25, 2022, 04:17 PM{" "}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Card>
    </Container>
  );
}

export default EventDetails;
