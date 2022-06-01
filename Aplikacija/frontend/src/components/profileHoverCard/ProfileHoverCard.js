import { Container, Image, Badge, Button  } from "react-bootstrap";

import elfak from "../../images/elfak.jpg";
import luka from "../../images/luka.jpg";
import "./ProfileHoverCard.style.css";

function ProfileHoverCard() {
  return (
    <Container className="profile-hover-cont">
      <div className="parent-pic-div">
        <Image src={elfak} alt="faculty-pic" className="bg-picture"></Image>
      <div className="child-pic-div">
        <Image
          src={luka}
          alt="profile-pic"
          className="profile-picture"
          roundedCircle
        ></Image>
      </div>
      </div>
      <h4 className="mt-5">Luka Kocić</h4>
      <Badge bg="warning"> Student </Badge>
      <p className="mt-1"> Univerzitet u Nišu </p>
      <p className="mt-0"> Elektronski fakultet </p>
      <div>
          <Badge> Posts 0 </Badge>
          <Badge className="ms-1"> Events 0 </Badge>
          <Badge className="ms-1"> Locations 0 </Badge>
      </div>
      <Button className="mt-3" size="sm"> More Information </Button>
    </Container>
  );
}

export default ProfileHoverCard;
